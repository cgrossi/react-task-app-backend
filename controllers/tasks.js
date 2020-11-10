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

module.exports = tasksRouter