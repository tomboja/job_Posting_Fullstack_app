const express = require('express')

const jobsControllers = require('../controllers/jobs.controllers')
const locationsControllers = require('../controllers/locations.controllers')

const router = express.Router()

router.route('/jobs')
  .get(jobsControllers.getAll)
  .post(jobsControllers.addOne)

router.route('/jobs/:jobId')
  .get(jobsControllers.getOne)
  .delete(jobsControllers.deleteOne)
  .put(jobsControllers.fullUpdateOne)
  .patch(jobsControllers.partialUpdateOne)

router.route('/jobs/:jobId/location')
  .get(locationsControllers.getAll)
  .post(locationsControllers.addOne)

router.route('/jobs/:jobId/location/:locationId')
  .get(locationsControllers.getOne)
  .delete(locationsControllers.deleteOne)
  .put(locationsControllers.fullUpdateOne)
  .patch(locationsControllers.partialUpdateOne)

module.exports = router