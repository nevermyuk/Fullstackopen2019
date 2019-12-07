const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const userObjects = helper.initialUsers.map(user => new User(user))
    const promiseArray = userObjects.map( user => user.save())
    await Promise.all(promiseArray)
  })



  test('creation succeeds with fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser ={
      username: 'chasingDreams',
      name:'John Doe',
      password: 'realitymaker',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length +1)

    const usernames = usersAtEnd.map( u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper status code and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser ={
      username: 'root',
      name:'SuperUser',
      password: 'secret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})


describe('username and password requirements', () => {
  test('username not given', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser ={
      name:'John Doe',
      password: 'realitymaker',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect('{"error":"username or password missing"}')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)

    const usernames = usersAtEnd.map( u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('password not given', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser ={
      username: 'Dreams',
      name:'John Doe',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect('{"error":"username or password missing"}')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)

    const usernames = usersAtEnd.map( u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('username not at least 3 chars long ', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser ={
      username:'ab',
      name:'John Doe',
      password: 'realitymaker',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect('{"error":"username and password must be at least 3 characters long"}')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)

    const usernames = usersAtEnd.map( u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })
  test('password not at least 3 chars long', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser ={
      username:'David',
      name:'John Doe',
      password: 'x',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect('{"error":"username and password must be at least 3 characters long"}')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)

    const usernames = usersAtEnd.map( u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})



