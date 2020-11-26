let db = require('../db.js');

//Get all rows in a table
exports.getAll = function (table, done) {
    db.get().query("SELECT * FROM " + table, function (err, rows) {
        if (err) return done(err);
        done(null, rows)
    })
};

/* Get all rows in a table where attr is x
By using a placeholder (?) we escape the user input before doing the query this avoids running into an sql injection*/
exports.getAllByAttr = function (table, attr, x, done) {
    db.get().query('SELECT * FROM ' + table + ' WHERE ' + attr + ' = ?', x, function (err, rows) {
        if (err) return done(err);
        done(null, rows)
    })
};

// Get all rows in a table where attr is x and attr2 is y
exports.getAllByAttrAndAttr2 = function (table, attr, x, attr2, y, done) {
    db.get().query('SELECT * FROM ' + table + ' WHERE ' + attr + ' = ? AND ' + attr2 + ' = ?', [x, y], function (err, rows) {
        if (err) return done(err);
        done(null, rows)
    })
};
