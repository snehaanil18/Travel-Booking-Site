const express = require('express')

const userController = require("../Controllers/userController")

const jwtMiddleware = require('../Middlewares/jwtMiddleware')

const packageController = require('../Controllers/packageController')

const adminController = require('../Controllers/adminController')

const bookingController = require('../Controllers/bookingController')

const multerConfig = require('../Middlewares/multerMiddleware')

const router = express.Router()

const Razorpay = require('razorpay')

const crypto = require('crypto')

router.post('/register', userController.register)

router.post('/login', userController.login)

router.post('/package/add-package', jwtMiddleware, multerConfig.single('travelImage'), packageController.addPackage)

router.get('/get-all-packages', packageController.viewAllPackages)

router.get('/get-packages', jwtMiddleware, packageController.viewPackage)

router.get('/home-packages', packageController.getHomePackages)

router.post('/admin-register', adminController.register)

router.post('/admin-login', adminController.login)

router.get('/view-destination/:pid', packageController.viewDestination)

router.post('/orders',jwtMiddleware, async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
          });
          
          const {amount,currency,receipt} = req.body
          console.log(amount,currency,receipt);
          const options = req.body;
          const order = await razorpay.orders.create(options);

          if (!order) {
            return res.status(500).send("Error");
          }
      
          res.json(order);
        } catch (err) {
          console.log(err);
          res.status(500).send("Error");
        }
});

//payment verify
router.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
  
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  });

  router.put('/package/update-package/:pid',jwtMiddleware,packageController.updateUserPackage)

  router.delete('/delete-package/:pid',jwtMiddleware,packageController.deletePackage)


  //add Booking
  router.post('/add-booking/:pid',jwtMiddleware,bookingController.addBooking)

  //view bookings on particular package
  router.get('/view-bookings/:pid',jwtMiddleware,bookingController.viewBookings)

module.exports = router