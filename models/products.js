import mongoose from 'mongoose'

const Schema = mongoose.Schema

// const productImageSchema = new Schema({
//  file: {
//    type: String
//  },
//  display: {
//    type: Boolean
//  }
// })

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, '未加名字']
  },
  price: {
    type: Number,
    required: [true, '未加價錢']
  },
  sell: {
    type: String,
    required: [true, '未寫是否上架']
  },
  description: {
    type: String
  },
  allergy: {
    type: String
  },
  period: {
    type: String
  },
  images: {
    type: String,
    required: [true, '未加入照片']
  },
  ingredient: {
    type: String
  },
  category: {
    type: String,
    required: [true, '未加類別']
  }
})

const products = mongoose.model('products', productSchema)

export default products
