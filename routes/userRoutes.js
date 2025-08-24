const express = require('express')
const { usercontroller, updatecontroller, updatepasswordcontroller, forgotPasswordController } = require('../controllers/userController')
const authmiddleware = require('../middlewares/authmiddleware')


const router = express.Router()

router.get("/get-user",authmiddleware,usercontroller)
router.put("/update-user",authmiddleware,updatecontroller)
router.post("/reset-password",authmiddleware,updatepasswordcontroller)


module.exports = router 


