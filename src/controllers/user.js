const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const mongooseDynamic = require('mongoose-dynamic-schemas');
const util = require('util');
const mongoose = require('mongoose');
const User = require('../models/user');
// const Applicant = require('../models/applicant');
const Form = require('../models/form');
/**
 *  validationresult handler
 *  @param {Express.Request} reqObj
 *  @param {Express.Response} resObj
 */
function validationResultHandler(reqObj, resObj) {
  const error = validationResult(reqObj);
  if (!error.isEmpty()) {
    return resObj.json({
      status: 'error',
      msg: error.array()[0],
    }).status(400);
  }
}

/**
 * generate jsonwebtoken
 * @param {ObjectId} id
 * @return {String}
 */
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
}

// user login and signup
exports.signup = async (req, res, next) => {
  try {
    validationResultHandler(req, res);
    const user = await User.create(req.body);
    res.json({
      status: 'success',
      body: user,
      msg: 'User created.',
    }).status(201);
  } catch (err) {
    res.json({
      status: 'error',
      msg: err.message,
    }).status(500);
  }
};

exports.login = async (req, res, next) => {
  try {
    validationResultHandler(req, res);

    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.verifyPassword(req.body.password))) {
      return res.json({
        status: 'error',
        msg: 'Invalid email or password',
      }).status(401);
    }
    const token = generateToken(user._id);

    res.json({ status: 'success', body: { user, token }, msg: 'User loggedin' }).status(200);
  } catch (err) {
    console.log('error: ', err);
    res.json({
      status: 'error',
      msg: err.message,
    }).status(500);
  }
};

// form create and get
exports.createForm = async (req, res, next) => {
  // req.body = {
  //   description: 'holala',
  //   gender: { type: 'String', default: 'Male' },
  //   email: { type: String, required: true, default: 4 },
  // };
  try {
    validationResultHandler(req, res);
    // const keys = Object.keys(req.body);
    // keys.shift();
    const { description } = req.body;
    delete req.body.description;

    const previousForm = await Form.findOne({ company: req.user.id });
    if (previousForm) return res.json({ status: 'error', msg: 'You can not create morethan one form' });
    Form.create({ description, company: req.user._id })
      .then((result) => mongooseDynamic.addSchemaField(Form, 'applicationForm', req.body)
        .then((result) => res.json({ status: 'success', msg: result }).status(201)))
      .catch((err) => res.json({ status: 'error', msg: err.message }));
  } catch (err) {
    res.json({ status: 'error', msg: err.message }).status(500);
  }
};

exports.getForms = async (req, res, next) => {
  try {
    validationResultHandler(req, res);

    const forms = await Form.find({ company: req.user._id });
    res.json({
      status: 'success',
      body: forms,
      msg: 'All forms',
    });
  } catch (err) {

  }
};

//   update and delete created form
exports.updateForm = async (req, res, next) => {
  try {

  } catch (err) {

  }
};

exports.deleteForm = async (req, res, next) => {
  try {

  } catch (err) {

  }
};
//   get applicants
exports.getApplicants = async (req, res, next) => {
  try {

  } catch (err) {

  }
};

exports.submitApplication = async (req, res, next) => {
  try {

  } catch (err) {

  }
};

//   get single applicant also update applicant status
exports.getApplicant = async (req, res, next) => {
  try {

  } catch (err) {

  }
};

exports.updateApplicant = async (req, res, next) => {
  try {

  } catch (err) {

  }
};
