const express = require('express');
const router = express.Router();

let technique = require('../models/technique');

/*
* This file is used to setup all the routing to do with techniques from the REST server
* You get send to this file with the url: /techniques/
* */

//Base function callback that is used for all database access for technique data
const done = function (err, rows, req, res, next, err_description) {
    if (err) {
        //Log the error when something goes wrong
        try {
            //Log the sql error on the logger
            console.log(err);
            throw new Error(err_description)
        } catch (er) {
            //Tell express this request has been served with an error
            next(er)
        }
    } else {
        //If successful then return the json representation of that
        res.json(rows)
    }
};

//If nothing else is specified, then we return all techniques in the techniques table
router.get('/', function (req, res, next) {
    technique.getAll(function (err, rows) {
        done(err, rows, req, res, next, "Unable to obtain techniques.")
    });
});

router.get('/objective_selection', function (req, res, next) {
    technique.getAllObjectiveSelection(function (err, rows) {
        done(err, rows, req, res, next, "Unable to obtain objective selection.")
    });
});

router.get('/objective_manipulation', function (req, res, next) {
    technique.getAllObjectiveManipulation(function (err, rows) {
        done(err, rows, req, res, next, "Unable to obtain objective manipulation.")
    });
});

router.get('/:technique_id/objective_selection/', function (req, res, next) {
    technique.getAllObjectiveSelectionMeasurementsByTechnique(req.params.technique_id, function (err, rows) {
        done(err, rows, req, res, next, "Unable to obtain the measurements of the technique " + req.params.technique_id);
    });
});

router.get('/:technique_id/objective_manipulation/', function (req, res, next) {
    technique.getAllObjectiveManipulationMeasurementsByTechnique(req.params.technique_id, function (err, rows) {
        done(err, rows, req, res, next, "Unable to obtain the measurements of the technique " + req.params.technique_id);
    });
});

router.get('/subjective/:type', function (req, res, next) {
    technique.getAllSubjectiveMeasurementsByType(req.params.type, function (err, rows) {
        done(err, rows, req, res, next, "Unable to obtain the measurements for type " + req.params.type );
    });
});

router.get('/:technique_id/subjective/:type', function (req, res, next) {
    technique.getAllSubjectiveMeasurementsByTechniqueAndType(req.params.technique_id, req.params.type, function (err, rows) {
        done(err, rows, req, res, next, "Unable to obtain the measurements of the technique " + req.params.technique_id + " for type " + req.params.type );
    });
});

//If there is an id in the url e.g. /techniques/1/ then we want to only return data from that specific technique
router.get('/:technique_id/', function (req, res, next) {
    technique.getAllByTechnique(req.params.technique_id, function (err, rows) {
        done(err, rows, req, res, next, "Unable to obtain the specific technique " + req.params.technique_id);
    });
});

//If there is an specification behind the id e.g. /techniques/1/images then we want to return that depending on the id
router.get('/:technique_id/images', function (req, res, next) {
    technique.getAllImagesByTechniqueId(req.params.technique_id, function (err, rows) {
        done(err, rows, req, res, next, "Unable to obtain the images of the technique " + req.params.technique_id);
    });
});

router.get('/:technique_id/applications', function (req, res, next) {
    technique.getAllApplicationsByTechniqueId(req.params.technique_id, function (err, rows) {
        done(err, rows, req, res, next, "Unable to obtain the applications of the technique " + req.params.technique_id);
    });
});

router.get('/:technique_id/sources', function (req, res, next) {
    technique.getAllSourcesByTechniqueId(req.params.technique_id, function (err, rows) {
        done(err, rows, req, res, next, "Unable to obtain the sources of the technique " + req.params.technique_id);
    });
});

//If no id is specified e.g. /techniques/performance/time then we return all measurements
router.get('/performance/:type', function (req, res, next) {
    technique.getAllMeasurementsByType(req.params.type,function (err, rows) {
        done(err, rows, req, res, next, "Unable to obtain the "+ req.params.type +" measurements");
    });
});

router.get('/:technique_id/performance/:type', function (req, res, next) {
    technique.getAllMeasurementsByTechniqueByType(req.params.technique_id, req.params.type, function (err, rows) {
        done(err, rows, req, res, next, "Unable to obtain the "+ req.params.type +" measurements of the technique " + req.params.technique_id + " with the type " + req.params.type);
    });
});

router.get('/:technique_id/performance/', function (req, res, next) {
    technique.getAllMeasurementsByTechnique(req.params.technique_id, function (err, rows) {
        done(err, rows, req, res, next, "Unable to obtain the "+ req.params.type +" measurements of the technique " + req.params.technique_id);
    });
});

module.exports = router;
