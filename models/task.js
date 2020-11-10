const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false
  },
  date: Date
})


taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})


module.exports = mongoose.model('Task', taskSchema)
