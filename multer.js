const multer = require('multer')

const storage = multer.diskStorage({
    
    destination: (req,file,cb)=>{
        cb(null, `public/temp`)
    },
    filename: (req,file,cb)=>{
        cb(null, `${req.body.codigo}.jpg`)
    }
})

const upload = multer({storage:storage})

module.exports = upload;