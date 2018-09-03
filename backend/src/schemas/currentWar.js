import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ClanSchema = new Schema({
  tag: String,
  name: String,
  badgeId: Number,
  clanScore: Number,
  participants: Number,
  battlesPlayed: Number,
  wins: Number,
  crowns: Number
})

const WarParticipantSchema = new Schema({
  tag: String,
  name: String,
  cardsEarned: Number,
  battlesPlayed: Number,
  wins: Number
})

const CurrentWarSchema = new Schema({
  state: String,
  collectionEndTime: String,
  clan: ClanSchema,
  participants: [WarParticipantSchema],
  war: Number,
  lastUpdate: {
    type: Date,
    default: Date.now
  }
})

export default CurrentWarSchema
