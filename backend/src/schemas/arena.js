import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ArenaSchema = new Schema({
  id: { type: Number, required: [true, 'Arena ID is required'] },
  name: String
})

export default ArenaSchema
