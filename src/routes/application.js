const router = require('express').Router();
const applicationController = require('../controllers/application');

router.route('/')
  .get(applicationController.getAllApplications);

router.route('/:id')
  .get(applicationController.getApplication);

module.exports = router;
