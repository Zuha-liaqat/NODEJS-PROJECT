const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const rolemiddleware = require("../middlewares/rolemiddleware");
const upload = require("../middlewares/multer");


const { 
  foodController, 
  getfoodController, 
  getbyIDfoodController, 
  updatebyIDController, 
  placeorderController, 
  deletebyIDfoodController 
} = require("../controllers/foodController");




const router = express.Router();

// Routes
router.post("/create", upload.single("image"), foodController);
router.get("/list", authmiddleware, rolemiddleware(["admin", "user"]), getfoodController);
router.get("/get/:id", getbyIDfoodController);
router.delete("/delete/:id", authmiddleware, rolemiddleware(["admin"]), deletebyIDfoodController);
router.put("/update/:id", authmiddleware, rolemiddleware(["admin"]), updatebyIDController);
router.post("/placeorder", authmiddleware, placeorderController);

module.exports = router;
