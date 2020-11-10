const express = require('express');
const app = express();
const tasksRouter = require('./controllers/tasks');
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

app.use('/api/tasks', tasksRouter)

module.exports = app