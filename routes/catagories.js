const express = require("express");
const router = express.Router();
const cors = require("cors");

const { check, validationResult } = require("express-validator");


const auth = require("../middleware/auth");
const Appointment = require("../models/appointment");
const Category = require("../models/categories")
const subCategory = require("../models/subcategory")
const addNotification = require('./notificationFunc');


router.use(cors());


router.post("/addCategory", async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {categoryName}=req.body

        const categoryFields = {};

 
  if (categoryName) categoryFields.categoryName = categoryName;
 

   let category = new Category(
    categoryFields
   )
   await category.save();

   return res.json({msg:"Category Created Successfully",category});
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
})

router.get('/getCategories',
    
async (req, res) => {
  

 
   try {
       let catagories = await Category.find()
       
       return res.json( catagories );
   }
   catch (err) {
       console.error(err.message);
       res.status(500).send('Server Error')
   }
});

router.post("/updateCategory",  async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
      const {categoryId,categoryName}=req.body

      const categoryFields = {};
      


if (categoryName) categoryFields.categoryName = categoryName;




 let category =  await Category.findOneAndUpdate({_id:categoryId},
    categoryFields,{
       unique:true
     }
 )


      



 return res.json("Category Updated Successfully");
  } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
  }
})

router.post("/deleteCategory", async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {categoryId}=req.body
  
  
   let category =  await Category.findOneAndDelete({_id:categoryId})
  
   return res.json("Category deleted Successfully");
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
  })

  router.post("/addSubCategory", async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {subCategoryName,categoryId}=req.body

        const subCategoryFields = {};

 
  if (subCategoryName) subCategoryFields.subCategoryName = subCategoryName;
  if (categoryId) subCategoryFields.categoryId = categoryId;
 

   let subcategory = new subCategory(
    subCategoryFields
   )
   await subcategory.save();

   return res.json({msg:"subCategory Created Successfully",subcategory});
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
})

router.get('/getSubCategories',
    
async (req, res) => {
  

 
   try {
       let subcatagories = await subCategory.find()
       
       return res.json( subcatagories );
   }
   catch (err) {
       console.error(err.message);
       res.status(500).send('Server Error')
   }
});

router.post("/updateSubCategory",  async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {subCategoryId,subCategoryName,categoryId}=req.body
  
        const subcategoryFields = {};
        
  
  
  if (subCategoryName) subcategoryFields.subCategoryName = subCategoryName;
  if (categoryId) subcategoryFields.categoryId = categoryId;
  
  
  
  
   let subcategory =  await subCategory.findOneAndUpdate({_id:subCategoryId},
      subcategoryFields,{
         unique:true
       }
   )
  
  
        
  
  
  
   return res.json({msg:"subCategory Updated Successfully",subcategory:subcategory});
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
  })

  router.post("/deleteSubCategory", async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {subCategoryId}=req.body
  
  
   let category =  await subCategory.findOneAndDelete({_id:subCategoryId})
  
   return res.json({msg:"subCategory deleted Successfully"});
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
  })
  module.exports = router;