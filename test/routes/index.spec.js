const request = require('supertest');
const app = require('../../server')

describe('Test the index route', () => {
  it('it responds as expected', () => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});

describe('Test the index route with search param', () => {
  it('it responds as expected', () => {
    request(app).get('/?search=Mitsubishi').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});

describe('Test the index route with search and field params', () => {
    it('it responds as expected', () => {
      request(app).get('/?search=Mitsubishi&field=vehicle_make').then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
      });
    });
});