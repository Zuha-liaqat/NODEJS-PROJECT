const express = require('express')
const { usercontroller, updatecontroller, updatepasswordcontroller, forgotPasswordController, getalluserscontroller, deleteuserbyIDcontroller, addToWishlistcontroller, getWishlist, removeFromWishlist } = require('../controllers/userController')
const authmiddleware = require('../middlewares/authmiddleware')


const router = express.Router()

router.get("/get-user/:id",authmiddleware,usercontroller)
router.put("/update-user/:id",authmiddleware,updatecontroller)
router.post("/reset-password",authmiddleware,updatepasswordcontroller)
router.get("/getallusers",getalluserscontroller)
router.delete("/delete/:id",deleteuserbyIDcontroller)
router.post("/wishlist/add/:id", authmiddleware, addToWishlistcontroller);
router.delete("/wishlist/remove/:id", authmiddleware, removeFromWishlist);
router.get("/wishlist/get", authmiddleware, getWishlist);



module.exports = router 


