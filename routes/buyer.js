const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require('uuid');
const { check, validationResult } = require("express-validator");
const addNotification = require("./notificationFunc");
// C:\Program Files\MongoDB\Server\3.4\bin
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Rating = require("../models/Ratings");

router.use(cors());


  

  const storageEngine = multer.diskStorage({
    destination: './public/uploads/categories/',
    filename: function (req, file, fn) {
      fn(null, req.body.categoryName + path.extname(file.originalname)); //+'-'+file.fieldname
    }
  });
  //init
  const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 200000 },
    fileFilter: function (req, file, callback) {
  
      validateFile(file, callback);
    }
  }).single('avatar');
  var validateFile = function (file, cb) {
   const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
      return cb(null, true);
    } else {
      cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
    }
  }
  cloudinary.config({
    cloud_name: "parking-app041",
    api_key: "522187368244197",
    api_secret: "_kgRpudcOL1CAy5McIDv-KVLNlk",
  });
// @route   GET api/profiles/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Buyer works Works" }));

// @route   POST api/profiles/createOrUpdateProfile
// @desc    Create new profile / Update existing profile
// @access  Public





module.exports = router;
