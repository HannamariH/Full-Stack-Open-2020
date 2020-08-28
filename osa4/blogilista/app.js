const config = require('./utils/config')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors())
app.use(express.json())
app.use(middleware.errorHandler)
app.use('/api/blogs', blogsRouter)

module.exports = app