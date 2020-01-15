const mongoose = require('mongoose');
const PointScheme = require('./utils/PointScheme');

// creating a Schema (a entity in the database)
const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  avatar_url: String,
  bio: String,
  techs: [String],
  location: {
    type: PointScheme,
    index: '2dsphere'
  }
});

// index: '2dsphere'
// used when working with geolocation

// mongoose.model(name_to_be_called, schema); 
// its exporting the way it should be in the database, with just 'Dev' name

module.exports = mongoose.model('Dev', DevSchema);