const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app)

const bcrypt = require('bcrypt');
const User = require('../models/user');

describe('When there is initially one user in the db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('thesecretpassword', 10)

    const user = new User({
      username: "test",
      name: "admin",
      passwordHash
    })

    await user.save()
  })

  test('Creation of a new user succeeds', async () => {
    const usersAtStart = await User.find({})

    console.log(usersAtStart)
    const user = {
      username: "newOne",
      name: "new",
      password: "password"
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(user.username)
  })
})