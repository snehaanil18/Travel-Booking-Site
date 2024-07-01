// 1. Import userSchema
const users = require('../Models/userSchema')

const jwt = require('jsonwebtoken')

//Register logic
exports.register = async(req,res) => {
    console.log('Inside Register Method');
    const {username,email,password} = req.body
    console.log(username,email,password);
    // accept data from client
    try{
        // check if email is already registered
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("User already exsists")
        }
        else{
            const newUser = new users({
                username,
                email,
                password,
                agency:""
            })
            await newUser.save()
            res.status(200).json(newUser)//we are passing newuser in case to give a welcome msg with user's name
        }
    }
    catch(err){
        res.status(500).json('Register failed..')
    }
}


//login
exports.login = async(req,res) => {
    console.log('Inside Login Method');
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"superkey")
            console.log(token);
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(404).json('Invalid email or password')
        }
    }
    catch(err){
        res.status(500).json('Login failed'+err)
    }
}