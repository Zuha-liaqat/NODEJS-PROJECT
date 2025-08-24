const express = require('express')
const { testusercontroller } = require('../controllers/TestController')



const router = express.Router()

router.get("/test-user",testusercontroller)

module.exports = router 


