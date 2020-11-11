const tasksRouter = require('express').Router()
const Task = require('../models/task');

tasksRouter.get('/', async (req, res) => {
  const tasks = await Task.find({})
  
  res.json(tasks)
})

tasksRouter.post('/', async (req, res) => {
  const task = new Task({
    ...req.body, date: new Date()
  })

  const returnedTask = await task.save()

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