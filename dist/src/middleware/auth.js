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
exports.roleCheck = exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const logger_1 = __importDefault(require("../utils/common/logger"));
function protectRoute(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.token;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    msg: "Token not found"
                });
            }
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
            if (!decodedToken) {
                return res.status(401).json({
                    success: false,
                    msg: "Invalid Token"
                });
            }
            const user = yield User_1.default.findById(decodedToken._id).exec();
            if (!user) {
                return res.status(401).json({
                    success: false,
                    msg: "Invalid Token"
                });
            }
            req.user = user;
            next();
        }
        catch (error) {
            logger_1.default.error(error);
            return res.status(500).json({
                success: false,
                msg: error.message
            });
        }
    });
}
exports.protectRoute = protectRoute;
function roleCheck(role) {
    return (req, res, next) => {
        var _a;
        try {
            if (!req.user || req.user.role !== role) {
                return res.status(401).json({
                    success: false,
                    msg: `User: ${(_a = req.user) === null || _a === void 0 ? void 0 : _a.role} is not authorize to access this role`
                });
            }
            next();
        }
        catch (error) {
            logger_1.default.error(error);
            return res.status(500).json({
                success: false,
                msg: error.message
            });
        }
    };
}
exports.roleCheck = roleCheck;
