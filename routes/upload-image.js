const express = require("express");
const imageRouter = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
    destination :  './uploads',
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,'profile-' + uniqueSuffix  + '.' + file.originalname.split('.')[1])
    }
  })
  
const upload = multer({ 
    storage: storage,
    fileFilter: filefilter
})

// upload Image
imageRouter.post('/upload', upload.single('file'),imageIsValid,post);

function filefilter(req, file, cb) {
    if(file.mimetype == 'image/png' || file.mimetype == 'image/gif' ){
        return cb(null, true)
    }else{
        return cb( null, false)
    }
}

function imageIsValid (req, res,cb) {
    if(req.file){
        console.log(req.file)
        console.log(req.body)
        // res.status(200).json({success :"Image uploaded"})
        return  cb(null, true)
} 
    res.status(500).json({error:"file field required (jpg or png Only)"})

}

function post (req, res){
    res.status(200).json( { message: 'Files Uploaded!' } )
}

module.exports = imageRouter;
