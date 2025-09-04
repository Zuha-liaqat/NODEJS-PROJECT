const express = require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const { contactController } = require('../controllers/contactController');






const router = express.Router()

router.post("/create",authmiddleware,contactController);



module.exports = router 
