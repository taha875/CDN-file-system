const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    }
})

// Schema.methods.createToken = async function() {
//     // Generate an auth token for the user
//     const user = this
//     email = user.email
    
//     const token = jwt.sign({
//       _id: user._id, 
//         email: user.email,
//       exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
//     }, 
//       process.env.jwtSecret)
//     return token
// }

const user = mongoose.model('user', Schema)

module.exports = user