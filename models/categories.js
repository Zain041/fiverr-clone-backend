const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema

// Create Schema
const CategoriesSchema = new Schema({
  // fullName: {
  //   type: String,
  //   required: true,
  // },
  categoryName: {
    type: String,
    required: true,
   
  },
  
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Category = mongoose.model('categories', CategoriesSchema)