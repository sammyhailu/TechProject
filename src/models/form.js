const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  company: { type: mongoose.Types.ObjectId, ref: 'User' },
  description: String,
}, { strict: false });

const Form = mongoose.model('Form', schema);
module.exports = Form;
