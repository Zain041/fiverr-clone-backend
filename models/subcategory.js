const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema

// Create Schema
const CategoriesSchema = new Schema({
  
  subCategoryName: {
    type: String,
    required: true,
   
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "categories",
    default: null,
   
  },
  
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = subCategory = mongoose.model('subcategories', CategoriesSchema)