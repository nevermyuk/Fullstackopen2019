const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map( blog => blog.save())
    await Promise.all(promiseArray)


  })

  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'React patterns'
    )
  })

  test('unique identifier property of blog posts is named id', async () => {
    const res = await api.get('/api/blogs')
    const id = res.body.map(r => r.id)
    expect(id).toBeDefined()
  })
})



describe('actions on specific blogs' , () => {
  test('create a new blog post', async () => {
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect( 'Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const titles =  blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'TDD harms architecture'
    )
  })

  test('likes missing will default to 0', async () => {
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      user:'5deb66a5107d431b50278043'
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect( 'Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 2)

    const blog =  blogsAtEnd.find(b => b.title === newBlog.title)
    expect(blog.likes).toBe(0)
  })

  test('title and url missing from request data, respond with status 400', async () => {
    const noTitleOrURL = {
      author: 'Robert C. Martin',
      likes:10,
      user:'5deb66a5107d431b50278043'
    }

    await api.post('/api/blogs')
      .send(noTitleOrURL)
      .expect(400)


  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })


  test('blog likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToUpdate= blogsAtStart[0]

    const updatedBlogLikes = { ...blogToUpdate,likes:512 }


    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlogLikes)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(blog => blog.title === updatedBlogLikes.title)
    expect(updatedBlog.likes).toBe(512)
  })

})

afterAll(() => {
  mongoose.connection.close()
})