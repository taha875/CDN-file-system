const express = require('express')
require('dotenv').config()
const cors = require('cors')
const userRouter = require('./routes/user')
let mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


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

app.listen(4050, () => {
    console.log(`Server running on port ${4050}`)
})