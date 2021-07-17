const { validationResult } = require('express-validator');
const Form = require('../models/form');

function validationResultHandler(reqObj, resObj) {
  const error = validationResult(reqObj);
  if (!error.isEmpty()) {
    return resObj.json({
      status: 'error',
      msg: error.array()[0],
    }).status(400);
  }
}

exports.getAllApplications = async (req, res, next) => {
  try {
    validationResultHandler(req, res);
    const applications = await Form.find();
    res.json({
      status: 'success',
      body: applications,
      msg: 'All applications',
    }).status(200);
  } catch (err) {
    res.json({ status: 'error', msg: err.message }).status(500);
  }
};

exports.getApplication = async (req, res, next) => {
  try {
    validationResultHandler(req, res);
    const application = await Form.findById(req.params.id);
    if (!application) {
      return res.json({
        status: 'error',
        msg: `Resource with ${req.params.id} ID not found`,
      }).status(404);
    }

    res.json({
      status: 'success',
      body: application,
      msg: 'Application found',
    });
  } catch (err) {
    res.json({ status: 'error', msg: err.message }).status(500);
  }
};
