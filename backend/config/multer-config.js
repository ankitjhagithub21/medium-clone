const multer = require('multer');
const path = require('path');

//Upload Image controller

const imgconfig = multer.diskStorage({
    destination:(req, file,callback)=>{
        callback(null,'uploads')
    },
    filename:(req, file, callback)=>{
        callback(null, `image-${Date.now()}.${file.originalname}`)
    }
})

//image filter
const upload = multer({
    
    storage: imgconfig,
    limits:{fileSize:'1000000'},
    fileFilter:(req, file, callback)=>{
        const fileType = /jpeg|jpg|png|gif/
        const mimeType = fileType.test(file.mimetype)
        const extname = fileType.test(path.extname(file.originalname))
        if(mimeType && extname){
            return callback(null, true)
        }
        callback('Give proper file format to upload')
    }
})

module.exports = upload