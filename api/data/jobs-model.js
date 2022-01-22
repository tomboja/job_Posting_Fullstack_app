const mongoose = require('mongoose')

const locationsSchema = mongoose.Schema({
  state: {
    type: String
  },
  city: {
    type: String,
    require: true,
  },
  zip: {
    type: Number,
  }
})

const jobsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    min: 0
  },
  location: locationsSchema,
  skills: [String],
  description: {
    type: String,
    "default": ''
  },
  experiance: {
    type: String,
    "default": '0 years'
  },
  postDate: {
    type: Date,
    "default": Date.now
  }
})

mongoose.model('Job', jobsSchema, 'jobs')
