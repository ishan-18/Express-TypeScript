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
exports.AuthController = void 0;
const validate_1 = require("../utils/validator/validate");
const uuid_1 = require("uuid");
const authService_1 = require("../services/authService");
const sendEmail_1 = __importDefault(require("../utils/common/sendEmail"));
const logger_1 = __importDefault(require("../utils/common/logger"));
class AuthController {
    static register_user(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, phone, address, role } = req.body;
                const validationResult = validate_1.userRegisterValidator.validate(req.body);
                if (validationResult.error) {
                    const validationErrors = validationResult.error.details.map((error) => error.message);
                    res.status(400).json({ errors: validationErrors });
                    return;
                }
                const user_details = {
                    _id: (0, uuid_1.v4)(),
                    name,
                    email,
                    password,
                    phone,
                    address,
                    role
                };
                try {
                    const newUser = yield authService_1.AuthService.registerUser(user_details);
                    res.status(201).json({
                        success: true,
                        data: newUser,
                    });
                }
                catch (error) {
                    logger_1.default.error(`Error in register_user controller: ${error.message}`);
                    res.status(400).json({ error: error.message });
                }
            }
            catch (error) {
                logger_1.default.error(`Error in Registering User`);
                res.status(500).json({
                    success: false,
                    msg: error
                });
            }
        });
    }
    static login_user(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const validationResult = validate_1.userLoginValidator.validate(req.body);
                if (validationResult.error) {
                    const validationErrors = validationResult.error.details.map((error) => error.message);
                    res.status(400).json({ errors: validationErrors });
                    return;
                }
                try {
                    const result = yield authService_1.AuthService.loginUser(email, password);
                    res.status(200).json({
                        success: true,
                        data: result,
                    });
                }
                catch (error) {
                    logger_1.default.error(`Error in User Login: ${error.message}`);
                    res.status(401).json({
                        success: false,
                        msg: error.message,
                    });
                }
            }
            catch (error) {
                logger_1.default.error(`Error in login_user controller: ${error.message}`);
                res.status(401).json({
                    success: false,
                    msg: error.message,
                });
            }
        });
    }
    static getMe(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                if (!user) {
                    res.status(401).json({
                        success: false,
                        msg: 'Unauthorized: User ID not found',
                    });
                    return;
                }
                const user_details = yield authService_1.AuthService.getMe(user);
                if (!user_details) {
                    res.status(404).json({
                        success: false,
                        msg: 'User not found',
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    data: user_details,
                });
            }
            catch (error) {
                logger_1.default.error(`Error in getMe controller: ${error.message}`);
                res.status(401).json({
                    success: false,
                    msg: error.message,
                });
            }
        });
    }
    static getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield authService_1.AuthService.getAllUsers();
                res.status(200).json({
                    success: true,
                    data: users
                });
            }
            catch (error) {
                logger_1.default.error(`Error in getAllUsers controller: ${error.message}`);
                res.status(401).json({
                    success: false,
                    msg: error.message,
                });
            }
        });
    }
    static forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const resetToken = yield authService_1.AuthService.forgotPassword(email);
                const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/resetpassword/${resetToken}`;
                const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to:\n\n${resetUrl}`;
                try {
                    yield (0, sendEmail_1.default)({
                        email,
                        subject: 'Password Reset Token',
                        message,
                    });
                    res.status(200).json({ success: true, data: 'Email sent' });
                }
                catch (error) {
                    logger_1.default.error(`Error in forgotPassword controller: ${error.message}`);
                    res.status(401).json({
                        success: false,
                        msg: error.message,
                    });
                }
            }
            catch (error) {
                logger_1.default.error(`Error in forgotPassword controller: ${error.message}`);
                res.status(401).json({
                    success: false,
                    msg: error.message,
                });
            }
        });
    }
    static resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { resettoken } = req.params;
                const { password } = req.body;
                const user = yield authService_1.AuthService.resetPassword(resettoken, password);
                res.status(200).json({
                    status: true,
                    data: user
                });
            }
            catch (error) {
                logger_1.default.error(`Error in resetPassword: ${error.message}`);
                res.status(400).json({
                    success: false,
                    msg: error.message
                });
            }
        });
    }
}
exports.AuthController = AuthController;
