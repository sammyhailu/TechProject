const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user');
const applicationRouter = require('./routes/application');

// load environmental vaiables
require('dotenv').config();

/**
 * setting up database
 */
mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then((client) => {
  console.log('Database connected successfuly.');
})
  .catch((err) => {
    console.log('failed to connect to the DB', err.message);
  });

// instanciating the app
const app = express();

/**
 * setting up middleware
 */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// api routes and end points
app.use('/ping', (req, res) => {
  res.json({ status: 'success', msg: 'Api is alive' }).status(200);
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/applications', applicationRouter);

// error handler
app.use('*', (req, res) => {
  res.json({ status: 'error', msg: `${req.originalUrl} Not Found!` }).status(404);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
