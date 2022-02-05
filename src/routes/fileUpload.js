const express = require('express')
const router = express.Router()
const multer = require('multer')
const slugify = require('slugify')

// const upload = multer({
//     dest: 'upload/',
//     limits: { fieldSize: 10 * 1024 * 1024 }
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename:async function (req, file, cb) {
        cb(null, Date.now() + slugify(file.originalname))
        
  	},
    limits:{fieldSize:10 * 1024 *1024}
})
const upload = multer({ storage: storage })
router.route('/document')
.post(upload.single('document'), 

(req, res, next) => { 
try {
    if(!req || !req.file){
        throw{
            code:400,
            message:"please provide a file"
        }
    }
    return res.status(200).send({success:true, response:req.file})
    
} catch (error) {
    let code = error.code || 500
    let message = error.message || JSON.stringify(error)
    return res.status(code).send({error:true, message:message})
}

})


function convertUnixTime(time){

    let unixtimestamp = time

    let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   
    let date = new Date(unixtimestamp*1000);
 
    let year = date.getFullYear();
   
    let month = months_arr[date.getMonth()];
  
    let day = date.getDate();
   
    let hours = date.getHours();
   
    let minutes =  date.getMinutes();
   
    let seconds =  date.getSeconds();
   
    let readableTime = `${day}-${month}-${year}T${hours}:${minutes}:${seconds}`;
    return readableTime
    
    
   }
module.exports = router 