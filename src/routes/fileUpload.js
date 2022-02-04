const express = require('express')
const router = express.Router()
const multer = require('multer')

const upload = multer({
    dest: 'upload/',
    limits: { fieldSize: 10 * 1024 * 1024 }
})

router.post('/document',upload.single('document'),async(req, res)=>{
    try {
        console.log(req.file)
        res.status(200).send({success:true, res:req.file})
    } catch (error) {
        console.log("error is here", error)
        return res.status(400).send({error:true, res:error})
    }
} )

module.exports = router 