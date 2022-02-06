const express = require('express')
require('dotenv').config()
const cors = require('cors')
const userRouter = require('./routes/user')
const fileSystemRouter = require('./routes/fileUpload')
const downloadRouter = require('./routes/download')
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
app.use('/', fileSystemRouter)
app.use('/file', downloadRouter)
app.get('/',(req, res)=>{
    res.status(200).send("app running")
})
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})