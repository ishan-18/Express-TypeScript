"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidator = exports.userRegisterValidator = exports.addressValidator = exports.phoneValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const enums_1 = require("../enums");
exports.phoneValidator = joi_1.default.object({
    country_isd_code: joi_1.default.string()
        .required()
        .messages({
        'any.required': 'country_isd_code is required.',
        'string.base': 'country_isd_code must be a string.',
    }),
    number: joi_1.default.string()
        .required()
        .pattern(/^[6-9]\d{9}$/)
        .messages({
        'any.required': 'number is required.',
        'string.base': 'number must be a string.',
        'string.pattern.base': 'Invalid number format. It should start with a digit between 6 and 9 and have a total of 10 digits.',
    }),
});
exports.addressValidator = joi_1.default.object({
    street: joi_1.default.string().required().messages({
        'any.required': 'street is required.',
        'string.base': 'street must be a string.',
    }),
    city: joi_1.default.string().required().messages({
        'any.required': 'city is required.',
        'string.base': 'city must be a string.',
    }),
    state: joi_1.default.string().required().messages({
        'any.required': 'state is required.',
        'string.base': 'state must be a string.',
    }),
    postalCode: joi_1.default.string().required().messages({
        'any.required': 'postalCode is required.',
        'string.base': 'postalCode must be a string.',
    }),
    country: joi_1.default.string().required().messages({
        'any.required': 'country is required.',
        'string.base': 'country must be a string.',
        'string.empty': 'country must not be empty'
    }),
});
;
exports.userRegisterValidator = joi_1.default.object({
    _id: joi_1.default.string().default(joi_1.default.ref('$uuidv4')).optional(), // Assuming $uuidv4 is passed as an external context variable
    name: joi_1.default.string().required().min(2).messages({
        'any.required': 'Name is required.',
        'string.min': 'Name must be at least 2 characters long.',
    }),
    email: joi_1.default.string().required().email().messages({
        'any.required': 'Email is required.',
        'string.email': 'Invalid email format.',
    }),
    password: joi_1.default.string().required().min(4).max(15).messages({
        'any.required': 'Password is required.',
        'string.min': 'Password must be at least 4 characters long.',
        'string.max': 'Password must not exceed 15 characters.',
    }),
    phone: exports.phoneValidator,
    address: exports.addressValidator,
    role: joi_1.default.string().valid(enums_1.UserRole.NORMALUSER, enums_1.UserRole.ADMIN).default(enums_1.UserRole.NORMALUSER),
}).options({ abortEarly: false });
exports.userLoginValidator = joi_1.default.object({
    email: joi_1.default.string().required().email().messages({
        'any.required': 'Email is required.',
        'string.email': 'Invalid email format.',
    }),
    password: joi_1.default.string().required().min(4).max(15).messages({
        'any.required': 'Password is required.',
        'string.min': 'Password must be at least 4 characters long.',
        'string.max': 'Password must not exceed 15 characters.',
    })
});
