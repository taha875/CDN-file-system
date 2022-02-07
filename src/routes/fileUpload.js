const express = require('express')
const router = express.Router()
const multer = require('multer')
const slugify = require('slugify')
const Files = require('../models/file')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

// const upload = multer({
//     dest: 'upload/',
//     limits: { fieldSize: 10 * 1024 * 1024 }
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: async function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))

    },
    limits: { fieldSize: 10 * 1024 * 1024 }
})
const upload = multer({ storage: storage }).single('document')
router.post('/document', async (req, res) => {
    try {
        
        upload(req, res, async (err) => {
            if (!req || !req.file) {
                throw {
                    code: 400,
                    message: "please provide a file"
                }
            }
            if (err) {
                throw {
                    code: 500,
                    message: err
                }
            }
            
            const file = new Files({
                filename: req.file.filename,
                uuid: uuidv4(),
                originalname:req.file.originalname,
                path: req.file.path,
                size: req.file.size,
    
            })
            const response = await file.save()
            return res.status(200).send({ success: true, response: `${process.env.base_url}/files/${response.uuid}` })
        })
    } catch (error) {
        let code = error.code || 500
        let message = error.message || JSON.stringify(error)
        return res.status(code).send({ error: true, message: message })

    }
})
router.get('/documents', async(req, res)=>{
    try{
        console.log("inside document router")
        let data = await Files.find({})
        
        res.status(200).send({success:true, data:data})
    }catch(error){
        return res.status(500).send({error:true, message:"error occured while fetching files metadata"})

    }
})

module.exports = router 