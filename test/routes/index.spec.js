const request = require('supertest');
const app = require('../../server')

describe('Test the index route', () => {
    it('it responds as expected', () => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                status: "SUCCESS"
            });
        });
    });
});