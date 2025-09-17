const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const rolemiddleware = require("../middlewares/rolemiddleware");

const multer = require("multer");
const path = require("path");

const { 
  foodController, 
  getfoodController, 
  getbyIDfoodController, 
  updatebyIDController, 
  placeorderController, 
  deletebyIDfoodController 
} = require("../controllers/foodController");

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // uploads folder ka path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

// Routes
router.post("/create", upload.single("image"), foodController);
router.get("/list", authmiddleware, rolemiddleware(["admin", "user"]), getfoodController);
router.get("/get/:id", getbyIDfoodController);
router.delete("/delete/:id", authmiddleware, rolemiddleware(["admin"]), deletebyIDfoodController);
router.put("/update/:id", authmiddleware, rolemiddleware(["admin"]), updatebyIDController);
router.post("/placeorder", authmiddleware, placeorderController);

module.exports = router;
