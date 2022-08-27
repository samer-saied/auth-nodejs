const express = require("express");
const imageRouter = express.Router();
const multer = require('multer')

let tempName = ""

const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: nameImage
})

const upload = multer({
    storage: storage,
    fileFilter: filefilter,
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
})

// upload Image
imageRouter.post('/upload', upload.single('file'), imageIsValid, post);

// sperated Func for "Upload image"
function nameImage(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    tempName = 'profile-' + uniqueSuffix + '.' + file.originalname.split('.')[1]
    cb(null, tempName)
}

function filefilter(req, file, cb) {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/gif') {
        return cb(null, true)
    } else {
        return cb(null, false)
    }
}

function imageIsValid(req, res, cb) {
    if (req.file) {
        return cb(null, true)
    }
    res.status(500).json({ error: "file field required (jpg or png Only)" })

}

function post(req, res) {
    res.status(200).json({ message: 'Files Uploaded! with name ' + tempName })
}

module.exports = imageRouter;
