const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "foodApp", // folder ka naam jahan images save hongi
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

module.exports = upload;
