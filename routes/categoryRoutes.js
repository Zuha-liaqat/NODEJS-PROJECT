const express = require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const { categoryController, getallcategoryController, updateController, deleteController } = require('../controllers/categoryController');



const router = express.Router()

router.post("/create",authmiddleware,categoryController);
router.get("/list",getallcategoryController);
router.put("/update/:id",authmiddleware,updateController);
router.delete("/delete/:id",authmiddleware,deleteController);


module.exports = router 
