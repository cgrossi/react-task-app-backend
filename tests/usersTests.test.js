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
    const getUsersStart = await User.find({})
    const usersAtStart = getUsersStart.map(user => user.toJSON())

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

    const getUsersEnd = await User.find({})
    const usersAtEnd = getUsersEnd.map(user => user.toJSON())
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(user.username)
  })
})

afterAll(done => {
  mongoose.connection.close()
  done()
})