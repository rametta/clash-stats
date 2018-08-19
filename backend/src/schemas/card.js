import mongoose from 'mongoose'
const Schema = mongoose.Schema

const IconUrlSchema = new Schema({
  small: String,
  medium: String,
  large: String
})

const CardSchema = new Schema({
  name: String,
  level: Number,
  maxLevel: Number,
  count: Number,
  iconUrls: IconUrlSchema
})

export default CardSchema
