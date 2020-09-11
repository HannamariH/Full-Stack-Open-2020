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

module.exports = blogsRouter