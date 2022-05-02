const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()
const notesRouter = require('./controllers/blogs')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to mongo')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

  
app.use(cors())
app.use(express.json())

app.use('/api/blogs', notesRouter)


module.exports = app