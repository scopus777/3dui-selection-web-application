const technique = require('../models/technique');
const db = require('../db');


describe('Test the connection to the database', () => {
    test('We should be able to connect to the production database', (done) => {
        db.connect(db.MODE_PRODUCTION, () => {
            db.get().query('SHOW TABLES', function (err, rows) {
                expect(err).toBeNull();
                expect(rows.length).toBeGreaterThan(0);
                done()
            });
        })
    });

    test('We should be able to connect to the test database', (done) => {
        db.connect(db.MODE_TEST, () => {
            db.get().query('SHOW TABLES', function (err, rows) {
                expect(err).toBeNull();
                expect(rows.length).toBeGreaterThan(0);
                done()
            });
        })
    });
});
