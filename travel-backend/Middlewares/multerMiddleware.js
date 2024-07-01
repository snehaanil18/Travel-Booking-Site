const multer = require('multer')

//to store multer data , All words are predefined

const storage = multer.diskStorage({
    destination:(req,file,callback) => {
        callback(null,'./uploads')
    },
    filename:(req,file,callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

const fileFilter = (req,file,callback) => {
    if(file.mimetype === 'image/png'||file.mimetype === 'image/jpg'||file.mimetype === 'image/jpeg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error("Please upload following image extension(png,jpg,jpeg) only..."))
    }
}

const multerConfig = multer({
    storage,fileFilter
})
module.exports = multerConfig