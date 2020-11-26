let base_model_db = require('./base_model_db.js');

/*MAIN TECHNIQUE*/
exports.getAll = function (done) {
    base_model_db.getAll('techniques_new', done);
};

exports.getAllByTechnique = function (technique, done) {
    base_model_db.getAllByAttr('techniques_new', 'id', technique, done);
};

exports.getAllObjectiveSelection = function (done) {
    base_model_db.getAll('technique_objective_selection', done);
};

exports.getAllObjectiveManipulation= function (done) {
    base_model_db.getAll('technique_objective_manipulation', done);
};

exports.getAllObjectiveSelectionMeasurementsByTechnique = function (technique_id, done) {
    base_model_db.getAllByAttr('technique_objective_selection', 'technique_id', technique_id, done);
};

exports.getAllObjectiveManipulationMeasurementsByTechnique = function (technique_id, done) {
    base_model_db.getAllByAttr('technique_objective_manipulation', 'technique_id', technique_id, done);
};

exports.getAllSubjectiveMeasurementsByTechniqueAndType = function (technique_id, type, done) {
    base_model_db.getAllByAttrAndAttr2('technique_subjective', 'type', type,'technique_id', technique_id, done);
};

exports.getAllSubjectiveMeasurementsByType = function (type, done) {
    base_model_db.getAllByAttr('technique_subjective', 'type', type, done);
};

/*MAIN IMAGES, STUDIES, SOURCES BY TECHNIQUE*/
exports.getAllImagesByTechniqueId = function (technique_id, done) {
    base_model_db.getAllByAttr('technique_image', 'technique_id', technique_id, done);
};

exports.getAllApplicationsByTechniqueId = function (technique_id, done) {
    base_model_db.getAllByAttr('technique_applications', 'technique_id', technique_id, done);
};

exports.getAllSourcesByTechniqueId = function (technique_id, done) {
    base_model_db.getAllByAttr('technique_source', 'technique_id', technique_id, done);
};

/*PERFORMANCE INDICATORS*/
exports.getAllMeasurementsByType = function (type, done) {
    base_model_db.getAllByAttr('technique_performance', 'type', type, done);
};

exports.getAllMeasurementsByTechnique = function (technique_id, done) {
    base_model_db.getAllByAttr('technique_performance', 'technique_id', technique_id, done);
};

exports.getAllMeasurementsByTechniqueByType = function (technique_id, type, done) {
    base_model_db.getAllByAttrAndAttr2('technique_performance', 'type', type, 'technique_id', technique_id, done);
};
