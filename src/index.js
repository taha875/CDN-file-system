const express = require('express')
require('dotenv').config()
const cors = require('cors')
const userRouter = require('./routes/user')
const fileSystemRouter = require('./routes/fileUpload')
let mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const port = process.env.port || 3000
require('./database/mongo')

const app = express()

app.use(cors(
    {
        "origin": "*",
        "methods": "GET,PUT,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 200,
        "exposedHeaders": "Access-Control-Allow-Method,Access-Control-Allow-Origin,Content-Type,Content-Length"
    }
))

app.use(express.json({ limit: '100mb' }))

app.use(express.urlencoded({ limit: '100mb', extended: true }))

app.use('/', userRouter)
app.use('/', fileSystemRouter)
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})