// 1. Import mongoose
const mongoose = require('mongoose')

//2. Schema creation
const packageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
        unique:true
    },
    from:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
        
    },
    details:{
        type:String,
        required:true
    },
    slots:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    travelImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const packages = mongoose.model('packages',packageSchema)

module.exports = packages