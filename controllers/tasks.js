const tasksRouter = require('express').Router()
const Task = require('../models/task');
const User = require('../models/user');

tasksRouter.get('/', async (req, res) => {
  const tasks = await Task.find({})
  
  res.json(tasks)
})

tasksRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findById(body.userId)

  const task = new Task({
    title: body.title,
    completed: body.completed,
    date: new Date(),
    user: user._id
  })

  const returnedTask = await task.save()
  user.tasks = user.tasks.concat(returnedTask._id)
  await user.save()

  res.status(201).json(returnedTask)
})

tasksRouter.put('/:id', async (req, res) => {
  const updates = {...req.body}

  await Task.findByIdAndUpdate(req.params.id, updates, {new: true}, (err, updatedTask) => {
    if(!err) {
      res.json(updatedTask)
    }
  })
})

tasksRouter.delete('/:id', async (req, res) => {
  await Task.findByIdAndRemove(req.params.id)
  
  res.status(204).end()
})

module.exports = tasksRouter