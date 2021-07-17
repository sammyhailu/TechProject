const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  company: { type: mongoose.Types.ObjectId, ref: 'User' },
  description: { type: String, required: true },
  title: { type: String, required: true },
  applicationForm: [],
}, { strict: false });

const Form = mongoose.model('Form', schema);
module.exports = Form;
