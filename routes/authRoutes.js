const express = require('express')
const { authcontroller, logincontroller, refreshTokenController } = require('../controllers/authController')



const router = express.Router()

router.post("/register",authcontroller);
router.post("/login",logincontroller)
router.post("/refresh-token",refreshTokenController)

module.exports = router 
