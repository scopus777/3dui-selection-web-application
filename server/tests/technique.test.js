const technique = require('../models/technique');
const db = require('../db');
const util = require('./util');

beforeAll((done) => {
    // Change the database to the test database
    return db.initializeTestDatabase(done);
});


describe('Test technique functions that interact with the database', () => {
    test('GetAll should return multiple instances', (done) => {
        technique.getAll((err, rows) => {
            //If there is an mysql error the test should fail
            expect(err).toBeNull();
            //There should only be one row returned
            expect(rows.length).toBeGreaterThan(1);
            //When we are done call the callback that the next test can be run
            done();
        })
    });

    test('GetAll should return all information for every element', (done) => {
        technique.getAll((err, rows) => {
            expect(err).toBeNull();
            expect(rows.length).toBeGreaterThan(1);

            //Check that it contains all the correct data:
            util.checkForCorrectTechniqueData(rows[0]);

            done();
        })
    });

    test('GetAllByTechnique should return all information for one element', (done) => {
        technique.getAllByTechnique('1', (err, rows) => {
            expect(err).toBeNull();
            expect(rows.length).toBe(1);

            //Check that it contains all the correct data:
            util.checkForCorrectTechniqueData(rows[0]);

            done();
        })
    });

    test('getAllImagesByTechniqueId should return all images for one element', (done) => {
        technique.getAllImagesByTechniqueId('4', (err, rows) => {
            expect(err).toBeNull();
            expect(rows.length).toBe(3);

            //Check that it contains all the correct data:
            expect(rows[0].technique_id).toBe(4);
            expect(rows[0].image).toBe('/images/Handle-Bar/1.png');

            expect(rows[1].technique_id).toBe(4);
            expect(rows[1].image).toBe('/images/Handle-Bar/2.png');

            expect(rows[2].technique_id).toBe(4);
            expect(rows[2].image).toBe('/images/Handle-Bar/3.png');

            done();
        })
    });

    test('getAllApplicationsByTechniqueId should return all Applications for one element', (done) => {
        technique.getAllApplicationsByTechniqueId('1', (err, rows) => {
            expect(err).toBeNull();
            expect(rows.length).toBe(1);

            //Check that it contains all the correct data:
            expect(rows[0].id).toBe(1);
            expect(rows[0].technique_id).toBe(1);
            expect(rows[0].url).toBe('#');
            expect(rows[0].description).toBe('Test Application');

            done();
        })
    });

    test('getAllSourcesByTechniqueId should return all sources for one element', (done) => {
        technique.getAllSourcesByTechniqueId('1', (err, rows) => {
            expect(err).toBeNull();
            expect(rows.length).toBe(3);

            //Check that it contains all the correct data:
            expect(rows[0].id).toBe(1);
            expect(rows[0].technique_id).toBe(1);
            expect(rows[0].url).toBe('https://www.pearson.com/us/higher-education/program/La-Viola-3-D-User-Interfaces-Theory-and-Practice-2nd-Edition/PGM101825.html');
            expect(rows[0].description).toBe('3D User Interfaces: Theory and Practice, 2nd Edition');

            done();
        })
    });

    test('getAllMeasurementsByType should return all PrecisionMeasurements for the type precision elements', (done) => {
        technique.getAllMeasurementsByType('precision', (err, rows) => {
            expect(err).toBeNull();
            expect(rows.length).toBeGreaterThan(1);

            //Take a few samples to see if the data contains multiple techniques:
            expect(rows[0].technique_id).toBe(1);
            expect(rows[10].technique_id).toBe(3);

            //Check all rows that they are of the precision type
            for (i = 0; i < rows.length; i++) {
                expect(rows[i].type).toBe('precision');
            }

            done();
        })
    });

    test('getAllMeasurementsByTechniqueByType should return all Measurements for the specified technique and Type', (done) => {
        technique.getAllMeasurementsByTechniqueByType('1', 'time', (err, rows) => {
            expect(err).toBeNull();
            expect(rows.length).toBeGreaterThan(1);

            //Check the returned data
            for (i = 0; i < rows.length; i++) {
                //All rows should have the same technique_id that we passed on
                expect(rows[i].technique_id).toBe(1);
                //All rows should be of the precision type
                expect(rows[i].type).toBe('time');
            }

            done();
        })
    });

    test('getAllMeasurementsByTechnique should return all Measurements by this technique', (done) => {
        technique.getAllMeasurementsByTechnique('1', (err, rows) => {
            expect(err).toBeNull();
            expect(rows.length).toBeGreaterThan(1);

            //Check the returned data
            for (i = 0; i < rows.length; i++) {
                //All rows should have the same technique_id that we passed on
                expect(rows[i].technique_id).toBe(1);
            }

            done();
        })
    });
});
