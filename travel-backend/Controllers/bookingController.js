const bookings = require('../Models/bookingSchema')
const packages = require('../Models/packageSchema');

exports.addBooking = async (req,res) => {
    const {name,people} = req.body
    const userId = req.payload
    const {pid} = req.params
    const packageId = pid
    try{
        const existingPackage = await packages.findOne({_id:pid})
        if(existingPackage){
            const newBooking = new bookings({
                userId,packageId,name,people
            })
            await newBooking.save()
            res.status(200).json(newBooking)
        }
        else{
            res.status(406).json("Package does not exsist")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.viewBookings = async(req,res) => {
    const { pid: packageId } = req.params;
    try{
        const userBookings = await bookings.find({packageId})
        console.log(userBookings);
        if(userBookings){
            res.status(200).json(userBookings)
        }
        else {
            res.status(401).json('database empty')
        }
    }
    catch {
        res.status(500).json('failed' + err)
    }
}