const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  description: String,
  authorId: String,
  hours: String


})

module.exports = mongoose.model('Project', projectSchema)