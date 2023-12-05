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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authDao_1 = require("../dao/authDao");
const hashing_1 = require("../utils/common/hashing");
const crypto_1 = __importDefault(require("crypto"));
class AuthService {
    static registerUser(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing_email = yield authDao_1.AuthDao.getUserByEmail(userDetails.email);
            const existing_phone = yield authDao_1.AuthDao.getUserByPhone(userDetails.phone.number);
            if (existing_email) {
                throw new Error(`User with the email: ${userDetails.email} already exists`);
            }
            if (existing_phone) {
                throw new Error(`User with the phone number: ${userDetails.phone.number} already exists`);
            }
            userDetails.password = yield (0, hashing_1.hashPassword)(userDetails.password);
            const newUser = yield authDao_1.AuthDao.createUser(userDetails);
            const token = this.generateToken(newUser);
            return token;
        });
    }
    static loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing_user = yield authDao_1.AuthDao.getUserByEmail(email);
            if (!existing_user) {
                throw new Error(`User not found with email: ${email}`);
            }
            const matchPassword = yield bcrypt_1.default.compare(password, existing_user.password);
            if (!matchPassword) {
                throw new Error('Invalid password');
            }
            const token = this.generateToken(existing_user);
            return token;
        });
    }
    static getMe(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return authDao_1.AuthDao.getMe(userId);
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return authDao_1.AuthDao.getAllUsers();
        });
    }
    static forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield authDao_1.AuthDao.getUserByEmail(email);
            if (!user) {
                throw new Error(`User not found with email: ${email}`);
            }
            const resetToken = authDao_1.AuthDao.getResetPasswordToken(user.email);
            return resetToken;
        });
    }
    static generateToken(user) {
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        });
        return token;
    }
    static resetPassword(resetToken, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
            const user = yield authDao_1.AuthDao.getUserByResetToken(hashedToken);
            if (!user) {
                throw new Error('Invalid token');
            }
            yield authDao_1.AuthDao.updateUserAfterResetPassword(user, newPassword);
            return user;
        });
    }
}
exports.AuthService = AuthService;
