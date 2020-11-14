const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const tasksRouter = require('./controllers/tasks');
const usersRouter = require('./controllers/users');
const mongoose = require('mongoose');
const config = require('./utils/config');

console.log('Connecting to MongoDB')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log(`Connected to Mongo Database..`)
  })
  .catch(e => {
    console.log(`error: ${e}`)
  })

app.use(cors());
app.use(bodyParser.json());
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);

module.exports = app