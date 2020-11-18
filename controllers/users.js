const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  let users = await User.find({}).populate('tasks', { title: 1, date: 1 })

  res.json(users);
})

usersRouter.get('/:id', async (req, res) => {
  let user = await User.findById(req.params.id)

  res.json(user)
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter