// 1. Import userSchema
const admin = require('../Models/adminSchema');

const jwt = require('jsonwebtoken')

//Register logic
exports.register = async(req,res) => {
    console.log('Inside Register Method');
    const {username,email,password,company} = req.body
    console.log(username,email,password,company);
    // accept data from client
    try{
        // check if email is already registered
        const existingAdmin = await admin.findOne({email})
        console.log(existingAdmin);
        if(existingAdmin){
            res.status(406).json("User already exsists")
        }
        else{
            console.log(' else part');
            console.log(req.body);
            const newAdmin = new admin({
                username,
                email,
                password,
                company
            })
            await newAdmin.save()
            console.log(newAdmin);
            res.status(200).json(newAdmin)//we are passing newuser in case to give a welcome msg with user's name
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}


//login
exports.login = async(req,res) => {
    console.log('Inside Login Method');
    const {email,password} = req.body
    try{
        const existingAdmin = await admin.findOne({email,password})
        if(existingAdmin){
            const token = jwt.sign({userId:existingAdmin._id},"superkey")
            console.log(token);
            res.status(200).json({existingAdmin,token})
        }
        else{
            res.status(404).json('Invalid email or password')
        }
    }
    catch(err){
        res.status(500).json('Login failed'+err)
    }
}