const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    if (blog.likes === undefined) {
      blog.likes = 0
    }

    try { 
      const savedBlog = await blog.save()
      response.json(savedBlog.toJSON())
    } catch(exception) {
      next(exception)
    }
  })

  blogsRouter.delete("/:id", async (request, response, next) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  })

  blogsRouter.put("/:id", async (request, response, next) => {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    try {
      const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      response.json(savedBlog.toJSON())
    } catch (exception) {
      next(exception)
    }
  })

module.exports = blogsRouter