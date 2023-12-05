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
exports.AuthDao = void 0;
const User_1 = __importDefault(require("../model/User"));
const crypto_1 = __importDefault(require("crypto"));
class AuthDao {
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findOne({ email }).exec();
        });
    }
    static getUserByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findOne({ 'phone.number': phone }).exec();
        });
    }
    static createUser(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_1.default(userDetails);
            return newUser.save();
        });
    }
    static getMe(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findById(userId).exec();
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.find({}).exec();
        });
    }
    static getResetPasswordToken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const resetToken = crypto_1.default.randomBytes(20).toString('hex');
            const reset_password_token = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
            const reset_password_expire = new Date(Date.now() + 10 * 60 * 1000);
            User_1.default.findOneAndUpdate({ email }, {
                reset_password_token,
                reset_password_expire
            }, {
                new: true
            }).exec();
            return resetToken;
        });
    }
    static getUserByResetToken(resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findOne({
                reset_password_token: resetToken,
                reset_password_expire: { $gt: Date.now() },
            }).exec();
        });
    }
    static updateUserAfterResetPassword(user, new_password) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findOneAndUpdate({ email: user.email }, {
                password: new_password,
                reset_password_token: undefined,
                reset_password_expire: undefined,
            }, {
                new: true
            }).exec();
        });
    }
}
exports.AuthDao = AuthDao;
