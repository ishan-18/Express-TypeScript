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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
const API_VERSION = "/v1";
describe('Registration Route', () => {
    it('should register a new user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .post(`${server_1.SB_URI}/${API_VERSION}/register`)
            .send({
            name: "Alice Smith",
            email: "alice@example10.com",
            password: "alice@12345",
            phone: {
                country_isd_code: "+91",
                number: "9999999953"
            },
            address: {
                street: "string",
                city: "string",
                state: "string",
                postalCode: "string",
                country: "string"
            },
            role: "ADMIN"
        });
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(typeof response.body.data).toBe('string');
    }));
    it('should handle registration with missing or invalid data', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app)
            .post(`${server_1.SB_URI}/${API_VERSION}/register`)
            .send({
            name: "Alice Smith",
            email: "alice@example11.com",
            password: "alice@12345",
            phone: {
                country_isd_code: "+91",
                number: "9999999943"
            },
            address: {
                street: "string",
                city: "string",
                state: "string",
                postalCode: 23,
                country: ""
            },
            role: "ADMIN"
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toHaveLength(2);
        expect(response.body.errors).toContain("postalCode must be a string.");
        expect(response.body.errors).toContain("country must not be empty");
    }));
});
