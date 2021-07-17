const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  companyName: String,
  firstName: String,
  lastName: String,
  phone: Number,
  address: String,
  email: { type: String, unique: true },
  password: String,
});

schema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

schema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', schema);
module.exports = User;
