const mongoose = require('mongoose');

// creating a Schema (a entity in the database)
const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  avatar_url: String,
  bio: String,
  techs: [String]
});