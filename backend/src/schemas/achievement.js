import mongoose from 'mongoose'
const Schema = mongoose.Schema

const AchievementSchema = new Schema({
  name: String,
  stars: Number,
  value: Number,
  target: Number,
  info: String
})

export default AchievementSchema
