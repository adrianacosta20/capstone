// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var jobsSchema = mongoose.Schema({
    model: { type: String, trim: true },
    dateCompleted: { type: Date },
    owner: { type: String, trim: true },
    description: { type: String }
});

module.exports = mongoose.model('Jobs', jobsSchema);