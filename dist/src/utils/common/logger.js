"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};
const logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.timestamp(), winston_1.format.printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${message} - ${stack || ''}`;
    })),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: 'app.log' }),
    ],
});
exports.default = logger;
