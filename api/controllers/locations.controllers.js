const mongoose = require('mongoose')

const Job = mongoose.model(process.env.DB_JOBS_MODEL)

const getAll = function (req, res) {
  console.log('Get request to get all jobs locations')
  const jobId = req.params.jobId
  if (!mongoose.isValidObjectId(jobId)) {
    console.log('Not valid job Id')
    res.status(400).json('Not Valid Job id')
    return
  }

  Job.findById(jobId).select('location').exec(function (error, job) {
    const response = {
      status: 200,
      message: job
    }

    if (error) {
      response.status = 500
      response.message = error
    } else if (!job) {
      response.status = 404
      response.message = 'No Location found with this id'
    }
    res.status(response.status).json(response.message)
  })

}

function _addJobLocation(req, res, job, response) {
  const { state, city, zip } = req.body
  const location = {
    state,
    city,
    zip: parseInt(zip)
  }
  job.location = location
  job.save(function (error, savedJob) {
    if (error) {
      response.status = 500
      response.message = error
    } else {
      response.status = 201
      response.message = savedJob
    }
    res.status(response.status).json(response.message)
  })
}

function _deleteJobLocation(req, res, job, response) {
  const location = {
    city: ''
  }
  job.location = location
  job.save(function (error, savedJob) {
    if (error) {
      response.status = 500
      response.message = error
    } else {
      response.status = 201
      response.message = savedJob
    }
    res.status(response.status).json(response.message)
  })
}

const addOne = function (req, res) {
  console.log('Add job location request')
  const jobId = req.params.jobId
  if (!mongoose.isValidObjectId(jobId)) {
    console.log('Not valid job Id')
    res.status(400).json('Not Valid Job id')
    return
  }

  Job.findById(jobId).select('location').exec(function (error, job) {
    const response = {
      status: 200,
      message: job
    }

    if (error) {
      response.status = 500
      response.message = error
    } else if (!job) {
      response.status = 404
      response.message = 'No Location found with this id'
    }
    _addJobLocation(req, res, job, response)
  })
}

function _saveJob(res, job, response) {
  job.save(function (error, savedJob) {
    if (error) {
      response.status = 500
      response.message = 'Failed to Update location data'
    } else {
      response.status = 204
      response.message = savedJob
    }
    res.status(response.status).json(response.message)
  })
}

function _fullUpdateCallback(req, res, job, response) {
  const { state, city, zip } = req.body
  const locationId = req.params.locationId
  if (!mongoose.isValidObjectId(locationId)) {
    res.status(400).status('LocationId not valid')
    return
  }
  // NOTE:::  USE THIS IF LOCATION IS ARRAY
  // const location = job.location.id(locationId) 
  job.location.state = state
  job.location.city = city
  job.location.zip = parseInt(zip)

  _saveJob(res, job, response)
}

function _partialUpdateCallback(req, res, job, response) {
  const { state, city, zip } = req.body
  const locationId = req.params.locationId
  if (!mongoose.isValidObjectId(locationId)) {
    res.status(400).status('LocationId not valid')
    return
  }

  if (state) job.location.state = state
  if (city) job.location.city = city
  if (zip) job.location.zip = parseInt(zip)

  _saveJob(res, job, response)
}


function _update(req, res, callback) {
  console.log('Update job location request')
  const jobId = req.params.jobId
  if (!mongoose.isValidObjectId(jobId)) {
    console.log('Not valid job Id')
    res.status(400).json('Not Valid Job id')
    return
  }

  Job.findById(jobId).select('location').exec(function (error, job) {
    const response = {
      status: 200,
      message: job
    }

    if (error) {
      response.status = 500
      response.message = error
    } else if (!job) {
      response.status = 404
      response.message = 'No Location found with this id'
    }
    callback(req, res, job, response)
  })
}

const fullUpdateOne = function (req, res) {
  _update(req, res, _fullUpdateCallback)
}

const partialUpdateOne = function (req, res) {
  _update(req, res, _partialUpdateCallback)
}

const deleteOne = function (req, res) {
  console.log('Delete job location request')
  const jobId = req.params.jobId
  if (!mongoose.isValidObjectId(jobId)) {
    console.log('Not valid job Id')
    res.status(400).json('Not Valid Job id')
    return
  }

  Job.findById(jobId).select('location').exec(function (error, job) {
    const response = {
      status: 200,
      message: job
    }

    if (error) {
      response.status = 500
      response.message = error
    } else if (!job) {
      response.status = 404
      response.message = 'No Location found with this id'
    }
    _deleteJobLocation(res, job, response)
  })

}

const getOne = function (req, res) {
  console.log('Get request to get all jobs locations')
  const jobId = req.params.jobId
  if (!mongoose.isValidObjectId(jobId)) {
    console.log('Not valid job Id')
    res.status(400).json('Not Valid Job id')
    return
  }

  Job.findById(jobId).select('location').exec(function (error, job) {
    const response = {
      status: 200,
      message: job
    }

    if (error) {
      response.status = 500
      response.message = error
    } else if (!job) {
      response.status = 404
      response.message = 'No Loca found with this id'
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
