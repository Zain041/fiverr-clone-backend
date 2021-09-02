const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require('uuid');
const config = require("config");
const auth = require("../middleware/auth");
const Services = require("../models/services");

// const Rating = require("../../models/Ratings");
// const Chats = require("../../models/Chat");
// const JobMessages = require("../../models/JobMessages");
// const ShopMessages = require("../../models/ShopMessages");
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

router.post("/addServices", auth, async (req, res) => {
  upload(req, res, async (error) => {
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {title,description}=req.body
        var image = null;
       
        await cloudinary.uploader.upload( 
          req.file.path,
          {
            resource_type: "image",
            public_id: "userProfileImages/"  + uuidv4(),
            chunk_size: 6000000,
          },
          function (error, result) {
            image = result;
          },
         
        );
        const servicesFields = {};

        const avatar= image;
        const public_id=image.public_id

        servicesFields.user = req.user._id;
        if (avatar) servicesFields.avatar = avatar.secure_url;
        if (public_id) servicesFields.public_id = avatar.public_id;
      

       
  
 
  if (title) servicesFields.title = title;
  if (description) servicesFields.description = description;

   let services = new Services(
       servicesFields
   )
   await services.save();

   return res.json("Service Created Successfully");
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
  })
})

router.post("/updateServices", auth, async (req, res) => {
  upload(req, res, async (error) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
      const {title,description}=req.body
      await cloudinary.uploader.upload( 
        req.file.path,
        {
          resource_type: "image",
          public_id: "userProfileImages/"  + uuidv4(),
          chunk_size: 6000000,
        },
        function (error, result) {
          image = result;
        },
       
      );
      const servicesFields = {};

      const avatar= image;
      const public_id=image.public_id

      servicesFields.user = req.user._id;
      if (avatar) servicesFields.avatar = avatar.secure_url;
      if (public_id) servicesFields.public_id = avatar.public_id;

    
      console.log(req.body.id)


if (title) servicesFields.title = title;
if (description) servicesFields.description = description;

 let services =  await Services.findOneAndUpdate({_id:req.body.id},
     servicesFields,{
       unique:true
     }
 
 )



 return res.json("Service Updated Successfully");
  } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
  }
})
})
router.post("/deleteServices", auth, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
      const {id}=req.body
      console.log(id)

 



 let services =  await Services.findOneAndDelete({_id:id}
    
 )


 return res.json("Service Deleted Successfully ");
  } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
  }
})


router.post("/getCurrentUserServices", auth, async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
   console.log(req.body.id)
    try {
      var services = await Services.find(
        { user: req.body.id },
        function (err, docs) {
          if (err) res.status(400).json({ err: [{ msg: "Services not found" }] });
        }
      );
      console.log(services)
      return res.json(services);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  module.exports = router;