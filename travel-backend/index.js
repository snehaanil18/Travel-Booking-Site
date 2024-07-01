// 1. Loads .env file contents into process.env by default
require('dotenv').config()

// 2. import express
const express = require('express')
// 3. import cors
const cors = require('cors')
// 7. import DB


// const applicationMiddleware = require('./Middlewares/applicationMiddleware')

// 4. create a application using express
const travelServer = express()

// 5. use
travelServer.use(cors())

const db = require('./DB/connection')

travelServer.use(express.json())

travelServer.use(express.urlencoded({extended:false}))

const router = require('./Routes/router')

const PORT = 4000 || process.env.PORT

travelServer.use(router)

travelServer.use('/uploads',express.static('./uploads'))

travelServer.listen(PORT,()=>{
    console.log(`travelServer Listening on port `+PORT);
})



travelServer.get('/',(req,res)=>{
    res.send("Welcome to travelServer")
})