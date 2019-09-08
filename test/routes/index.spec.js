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
      expect(response.body).toEqual({
        status: "SUCCESS",
        message: `A record with value of '49' in the 'id' field found.`,
        data: data[48],
        count: 1
      });
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
      expect(response.body.message).toBe("Records with value of 'Escalade' found.");
    });
    done();
  });

  //SEARCH NO MATCH
  it('Responds with 404 when /search/Test is used and no matching value is found', (done) => {
    request(app).get('/search/Test').then((response) => {
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        status: "ERROR",
        message: "Records with value of 'Test' not found."
      });
    });
    done();
  });

  //SEARCH AND FIELD MATCH SUCCESSFUL
  it('Responds with 2 results using /search/Ford/first_name', (done) => {
    request(app).get('/search/Ford/first_name').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.data[0].id).toEqual(228);
      expect(response.body.data[1].id).toEqual(513);
      expect(response.body.count).toEqual(2);
      expect(response.body.message).toBe("Records with value of 'Ford' in the field 'first_name' found.");
    });
    done();
  });

  //SEARCH AND FIELD MATCH SUCCESSFUL
  it('Responds with 2 results using /search/Ford/first_name,last_name', (done) => {
    request(app).get('/search/Ford/first_name,last_name').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.data[0].id).toEqual(180);
      expect(response.body.data[1].id).toEqual(228);
      expect(response.body.data[2].id).toEqual(414);
      expect(response.body.data[3].id).toEqual(440);
      expect(response.body.data[4].id).toEqual(513);
      expect(response.body.data[5].id).toEqual(722);
      expect(response.body.data[6].id).toEqual(865);
      expect(response.body.data[7].id).toEqual(890);
      expect(response.body.data[8]).toBeUndefined();
      expect(response.body.count).toEqual(8);
      expect(response.body.message).toBe("Records with value of 'Ford' in the field 'first_name,last_name' found.");
    });
    done();
  });

  //SEARCH AND FIELD NO MATCH
  it('Responds with 404 when using /search/Test/first_name', (done) => {
    request(app).get('/search/Test/first_name').then((response) => {
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        status: "ERROR",
        message: "Records with value of 'Test' in the field 'first_name' not found."
      });
    });
    done();
  });

  //YEARS MATCH SUCCESSFUL
  it('Responds with 4 results using /years/1973/1975', (done) => {
    request(app).get('/years/1973/1975').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.data[0].id).toEqual(434);
      expect(response.body.data[1].id).toEqual(853);
      expect(response.body.data[2].id).toEqual(912);
      expect(response.body.data[3].id).toEqual(983);
      expect(response.body.data[4]).toBeUndefined();
      expect(response.body.count).toEqual(4);
      expect(response.body.message).toBe("Records with vehicle_year between '1973' and '1975' found.");
    });
    done();
  });

  //YEARS NO MATCH
  it('Responds with 404 when using /years/1900/1901', (done) => {
    request(app).get('/years/1900/1901').then((response) => {
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        status: "ERROR",
        message: "Records with vehicle_year between '1900' and '1901' not found."
      });
    });
    done();
  });

});