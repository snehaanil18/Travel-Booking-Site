// const jwt = require('jsonwebtoken')
// // Token Verification

// const jwtMiddleware = (req,res,next) => {
//     console.log('Inside jwt Middleware');
//     try{
//             //get token
//     const token = req.headers['authorization'].slice(7)
//     console.log(token)

//     //verify the token
//     const jwtVerification = jwt.verify(token,"superkey")
//     console.log(jwtVerification); //payload - userId
//     req.payload = jwtVerification.userId
//     next()
//     }
//     catch(err){
//         res.status(401).json({"Authorization error":err.message})
//     }

// console.log('exiting');

   
// }

// module.exports = jwtMiddleware

const jwt = require('jsonwebtoken');

// Token Verification Middleware
const jwtMiddleware = (req, res, next) => {
    console.log('Inside jwt Middleware');
    
    try {
        // Check if the Authorization header is present
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ "Authorization error": "Authorization header missing or malformed" });
        }

        // Get token
        const token = authHeader.split(' ')[1];
        console.log('Token:', token);

        // Verify the token
        const jwtVerification = jwt.verify(token, process.env.JWT_SECRET || 'superkey'); // Use environment variable
        console.log('JWT Verification:', jwtVerification); // payload - userId

        req.payload = jwtVerification.userId;
        next();
    } catch (err) {
        console.error('JWT Error:', err.message);
        res.status(401).json({ "Authorization error": err.message });
    }

    console.log('Exiting JWT Middleware');
};

module.exports = jwtMiddleware;
