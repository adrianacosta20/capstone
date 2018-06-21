// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var clientsSchema = mongoose.Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },  
  email: { type: String, lowercase: true, trim: true },
  phone: { type: String }
});

module.exports = mongoose.model('Clients', clientsSchema);