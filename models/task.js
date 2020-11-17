const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false
  },
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    ret.date = ret.date.toString()
    delete ret._id
    delete ret.__v
  }
})


module.exports = mongoose.model('Task', taskSchema)
