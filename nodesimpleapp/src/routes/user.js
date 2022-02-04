const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/signup', async (req, res) => {
    try {
        if (!req || !req.body || !req.body.email || !req.body.password || !req.body.name) {

            return res.status(400).send({ error: true, message: "please provide email, name and password" })
        }
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).send({ error: true, message: "user exists" })
        }
        req.body.password = await bcrypt.hash(req.body.password, 8)
        let newUser = new User({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        })
        let response = await newUser.save()

        res.status(201).send({ success: true, response: response })
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: true, message: "system was not able to create the user" })
    }
})
router.post('/login', async (req, res) => {
    try {
        if (!req || !req.body || !req.body.email || !req.body.password) {

            return res.status(400).send({ error: true, message: "please provide email password" })
        }
        
        let user = await User.findOne({ email: req.body.email })
        

        if (!user) {
            return res.status(400).send({ error: true, message: "user does not exists" })
        }
        // Generate an auth token for the user
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).send({ error: true, message: "incorrect password" })
        }

        const token = jwt.sign({
            _id: user._id,
            email: user.email,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
        },
            process.env.jwtSecret)

        

        

        res.status(201).send({ success: true, response: { token: token, user: user } })

    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: true, message: error})
    }
})
module.exports = router