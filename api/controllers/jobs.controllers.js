const mongoose = require('mongoose')
const Jobs = mongoose.model(process.env.DB_JOBS_MODEL)

const getAll = function (req, res) {
  console.log('Getall request')
  
  Jobs.find().exec(function (error, jobs) {
    const response = {
    status: 200,
    message: jobs
  }
    if (error) {
      response.status = 505
      response.message = 'Error occured while fetching all jobs'
    }
    res.status(response.status).json(response.message)
  })
}

const addOne = function (req, res) {
  const { title, salary, skills, description, experiance, postDate } = req.body
  const newJob = {
    title,
    skills,
    description,
    experiance,
    postDate,
    location: {city: ''},
    salary: parseFloat(salary),
  
  }

  Jobs.create(newJob, function (error, job) {
    const response = {
      status: 201,
      message: job
    }
    if (error) {
      response.status = 500
      response.message = 'Error saving new job' + error
    }
    res.status(response.status).json(response.message)
  })
}

function _update(req, res, callback) {
  console.log('Update games request')
  const jobId = req.params.jobId
  if (!mongoose.isValidObjectId(jobId)) {
    console.log('Job Id not valid')
    res.status(400).json('Requested job id not valid')
    return
  }

  Jobs.findById(jobId).exec(function (error, foundJob) {
    const response = {
      status: 200,
      message: foundJob
    }

    if (error) {
      response.status = 500
      response.message = error
    } else if (!foundJob) {
      response.status = 404
      response.message = 'Job with given Id not found'
    } else {
      callback(req, res, foundJob, response)
    }
  })

}

function _saveOneJob(res, job, response) {
  job.save(function (error, updatedJob) {
    if (error) {
      response.status = 500
      response.message = error
    } else {
      response.status = 200
      response.message = updatedJob
    }

    res.status(response.status).json(response.message)
  })
}

function _gameFullUpdate(req, res, job, response) {
  const { title, salary, location, skills, postDate } = req.body
  job.title = title
  job.salary = parseFloat(salary)
  job.location = location
  job.skills = skills
  job.postDate = postDate

  _saveOneJob(res, job, response)
}

function _gamePartialUpdate(req, res, job, response) {
  const { title, salary, location, skills, postDate } = req.body
  if (title) job.title = title
  if (salary) job.salary = parseFloat(salary)
  if (location) job.location = location
  if (skills) job.skills = skills
  if (postDate) job.postDate = postDate

  _saveOneJob(res, job, response)
}

const fullUpdateOne = function (req, res) {
  console.log('full update one game')
  _update(req, res, _gameFullUpdate)
}
const partialUpdateOne = function (req, res) {
  console.log('partial update one game')
  _update(req, res, _gamePartialUpdate)
}

const deleteOne = function (req, res) {
  console.log('Delete request for job with give Id')
  const jobId = req.params.jobId
  if (!mongoose.isValidObjectId(jobId)) {
    res.status(400).json({ message: 'Job id not valid' })
    return
  }
  Jobs.findByIdAndDelete(jobId).exec(function (error, deletedJob) {
    console.log('Deleted Job ', deletedJob)
    const response = {
      status: 204,
      message: deletedJob
    }
    if (error) {
      response.status = 500
      response.message = error
    } else if (!deletedJob) {
      response.status = 404
      response.message = 'Job with give id not found'
    }
    res.status(response.status).json(response.message)
  })
}

const getOne = function (req, res) {
  console.log('Get one job by job id')
  const jobId = req.params.jobId
  if (!mongoose.isValidObjectId(jobId)) {
    res.status(400).json({ message: 'Job Id not valid' })
    return
  }

  Jobs.findById(jobId).exec(function (error, job) {
    const response = {
      status: 200,
      message: job
    }
    if (error) {
      response.status = 500
      response.message = error
    } else if (!job) {
      response.status = 404
      response.message = 'Job with give id not available'
    }

    res.status(response.status).json(response.message)
  })
}

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  fullUpdateOne,
  partialUpdateOne
}
