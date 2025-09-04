const express = require('express');
const { restuarantController, getallrestuarantController, getrestuarantbyIdController, deleterestuarantbyIdController } = require('../controllers/restuarantController');
const authmiddleware = require('../middlewares/authmiddleware')



const router = express.Router()

router.post("/create",authmiddleware,restuarantController);
router.get("/list",getallrestuarantController);
router.get("/get/:id",getrestuarantbyIdController);
router.delete("/delete/:id",authmiddleware,deleterestuarantbyIdController);


module.exports = router 
