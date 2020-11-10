const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false
  },
  date: Date
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
