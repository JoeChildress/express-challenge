const request = require('supertest');
const app = require('../../server');
const data = require('../../src/data/MOCK_DATA.json');

describe('Vehicle Owner Data API', () => {

  //BASE ROUTE
  it('Base route call returns all data', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toEqual(data);
    });
    done();
  });

  //ID MATCH SUCCESSFUL
  it('Route with ID returns the matching ID data', (done) => {
    request(app).get('/49').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toEqual(data[48]);
    });
    done();
  });

  //ID NO MATCH
  it('Responds with 404 when no matching ID is found', (done) => {
    request(app).get('/nonid').then((response) => {
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        status: "ERROR",
        message: "No record with id 'nonid' found."
      });
    });
    done();
  });

  //SEARCH MATCH SUCCESSFUL
  it('Responds with 4 results using search param value of Escalade', (done) => {
    request(app).get('/search/Escalade').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.data[0].id).toEqual(14);
      expect(response.body.data[1].id).toEqual(216);
      expect(response.body.data[2].id).toEqual(289);
      expect(response.body.data[3].id).toEqual(437);
      expect(response.body.data[4]).toBeUndefined();
    });
    done();
  });

  //SEARCH NO MATCH
  it('Responds with 404 when /search/Test is used and no matching value is found', (done) => {
    request(app).get('/search/Test').then((response) => {
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        status: "ERROR",
        message: "No records with value of 'Test' found."
      });
    });
    done();
  });

  //SEARCH AND FIELD MATCH SUCCESSFUL
  // it('Responds with 2 results using /search/Ford/first_name', (done) => {
  //   request(app).get('/search/Ford/first_name').then((response) => {
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body.data[0].id).toEqual(228);
  //     expect(response.body.data[1].id).toEqual(513);
  //     expect(response.body.count).toEqual(2);
  //   });
  //   done();
  // });

  //SEARCH AND FIELD NO MATCH
  // it('Responds with 404 when using /search/Test/first_name', (done) => {
  //   request(app).get('/search/Test/first_name').then((response) => {
  //     expect(response.statusCode).toBe(404);
  //     expect(response.body).toEqual({
  //       status: "ERROR",
  //       message: "No records with value of 'Test' in the field 'first_name' found."
  //     });
  //   });
  //   done();
  // });

});