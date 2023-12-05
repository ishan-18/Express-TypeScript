"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.SB_URI = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("colors");
const morgan_1 = __importDefault(require("morgan"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const hpp_1 = __importDefault(require("hpp"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logger_1 = __importDefault(require("./utils/common/logger"));
exports.SB_URI = "/api";
dotenv_1.default.config({ path: './src/config/.env' });
(0, db_1.connectDB)();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)());
// const csrfProtection = csurf({ cookie: true });
// app.use(csrfProtection);
// app.use((req, res, next) => {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });
if (process.env.NODE_ENV === 'development') {
    exports.app.use((0, morgan_1.default)('dev'));
}
exports.app.use((0, helmet_1.default)());
exports.app.use((0, express_mongo_sanitize_1.default)());
exports.app.use((0, hpp_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 100,
});
exports.app.use(limiter);
//Routes
exports.app.use(`${exports.SB_URI}/`, auth_1.default);
exports.app.all("*", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(404).json({
        success: false,
        data: "Invalid api endpoint"
    });
}));
const PORT = parseInt(process.env.PORT || '5000', 10);
const mode = process.env.NODE_ENV;
const server = exports.app.listen(PORT, () => {
    logger_1.default.info(`Server Listening at PORT ${PORT} in ${mode} mode`.cyan.bold);
});
process.on('unhandledRejection', (error, promise) => {
    logger_1.default.error(`Error ${error.message}`.red.bold);
    server.close(() => {
        process.exit(1);
    });
});
