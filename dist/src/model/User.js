"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const enums_1 = require("../utils/enums");
const phoneSchema = new mongoose_1.Schema({
    country_isd_code: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
        unique: true,
        match: /^[6-9]\d{9}$/,
    }
});
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
});
const userSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: (0, uuid_1.v4)()
    },
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    phone: phoneSchema,
    address: addressSchema,
    reset_password_token: String,
    reset_password_expire: Date,
    role: {
        type: String,
        enum: [enums_1.UserRole.NORMALUSER, enums_1.UserRole.ADMIN],
        default: enums_1.UserRole.NORMALUSER
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('User', userSchema);
