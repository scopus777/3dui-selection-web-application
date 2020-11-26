const app = require('../app');
const request = require('supertest');
const db = require('../db');
const util = require('./util');
let techniques = require('../routes/techniques');

beforeAll((done) => {
    // Change the database to the test database
    return db.initializeTestDatabase(done);
});

describe('Techniques should return all cards and be available to connect to.', () => {
    test('Techniques should be reachable and return 200 via GET', () => {
        return request(app).get("/techniques").then(response => {
            expect(response.statusCode).toBe(200)
        })
    });

    test('Techniques should return a JSON object', async () => {
        const res = await request(app).get('/techniques');

        expect(res.type).toEqual('application/json')
    });

    test('Techniques should return all techniques with all the information', async () => {
        const res = await request(app).get('/techniques');

        expect(res.body.length).toBeGreaterThan(1);

        //Check that it contains all the correct data:
        util.checkForCorrectTechniqueData(res.body[0]);
    });

    test('Techniques that get a id should return the specified technique with all the information', async () => {
        const res = await request(app).get('/techniques/1');

        expect(res.body.length).toBe(1);

        //Check that it contains all the correct data:
        util.checkForCorrectTechniqueData(res.body[0]);
    });

    test('Techniques that get a id and a specified attribute should return the specified attribute associated with the technique', async () => {
        const res = await request(app).get('/techniques/1/images');

        //Check that only 1 image is returned
        expect(res.body.length).toBe(1);
    });
});
