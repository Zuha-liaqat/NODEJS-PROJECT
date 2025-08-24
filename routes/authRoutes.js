const express = require('express')
const { authcontroller, logincontroller } = require('../controllers/authController')



const router = express.Router()

router.post("/register",authcontroller);
router.post("/login",logincontroller)

module.exports = router 
