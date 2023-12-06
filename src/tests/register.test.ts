import request from 'supertest';
import { app, SB_URI } from '../server';
const API_VERSION: string = "/v1"

describe('Registration Route', () => {
    it('should register a new user successfully', async () => {
        const response = await request(app)
            .post(`${SB_URI}/${API_VERSION}/register`)
            .send({
                name: "Alice Smith",
                email: "alice@example65.com",
                password: "alice@12345",
                phone: {
                    country_isd_code: "+91",
                    number: "9999439953"
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
    });
    it('should handle registration with missing or invalid data', async () => {
        const response = await request(app)
            .post(`${SB_URI}/${API_VERSION}/register`)
            .send({
                name: "Alice Smith",
                email: "alice@example66.com",
                password: "alice@12345",
                phone: {
                    country_isd_code: "+91",
                    number: "89499697943"
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
    });
})
