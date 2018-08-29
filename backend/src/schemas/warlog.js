import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ParticipantSchema = new Schema({
  tag: String,
  name: String,
  cardsEarned: Number,
  battlesPlayed: Number,
  wins: Number
})

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

const StandingSchema = new Schema({
  clan: ClanSchema,
  trophyChange: Number
})

const WarlogSchema = new Schema({
  seasonId: Number,
  createdDate: { type: String, unique: true },
  createdDateClean: String,
  participants: [ParticipantSchema],
  standings: [StandingSchema],
  standing: String,
  lastUpdate: {
    type: Date,
    default: Date.now
  }
})

export default WarlogSchema
