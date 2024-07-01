// Schema maps to a mongodb collection

// 1. Import mongoose
const mongoose = require('mongoose')

// 2. Schema creation
const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    }
})

// 3. Create model

const admin = mongoose.model('admin',adminSchema)
module.exports = admin