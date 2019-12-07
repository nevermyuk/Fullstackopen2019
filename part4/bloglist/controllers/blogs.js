const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')


blogsRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username: 1 , name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request,response,next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})


blogsRouter.post('/', async (request, response,next ) => {
  const body = request.body
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error : 'token missing or invalid' })
    }


    const user = await User.findById(decodedToken.id)

    const blog = new Blog ({
      title : body.title,
      author: body.author,
      url:body.url,
      likes : body.likes || 0,
      user: user._id
    })


    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())

  }
  catch(exception) {
    next(exception)
  }

})

blogsRouter.delete('/:id', async (request,response,next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token|| !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(decodedToken.id)
    if (user.blogs.map(b => b.toString()).includes(blog._id)){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
    return response.status(401).json({ error:' blog post is not created by you!' })
    }
  }

  catch(exception){
    next(exception)
  }
})

blogsRouter.put('/:id', async (request,response,next) => {
  const body = request.body
  const blog = {
    title : body.title,
    author: body.author,
    url: body.url,
    likes:body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog , { new:true })
    if (updatedBlog) {
      response.json(updatedBlog.toJSON())
    } else {
      response.status(404).end()
    }

  }
  catch(exception){
    next(exception)
  }
})

module.exports = blogsRouter