const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId:{
        type:String,
       
    },
    packageId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    people:{
        type:String,
        required:true
    }
})

const bookings = mongoose.model('bookings',bookingSchema)

module.exports = bookings