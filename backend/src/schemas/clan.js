import mongoose from 'mongoose'
import ArenaSchema from './arena'
const Schema = mongoose.Schema

const LocationSchema = new Schema({
  id: Number,
  name: String,
  isCountry: Boolean
})

const MemberSchema = new Schema({
  tag: String,
  name: String,
  role: String,
  expLevel: Number,
  trophies: Number,
  clanRank: Number,
  previousClanRank: Number,
  donations: Number,
  donationsReceived: Number,
  arena: ArenaSchema
})

const ClanSchema = new Schema({
  tag: { type: String, required: [true, 'Clan Tag is required'] },
  name: String,
  type: String,
  description: String,
  badgeId: Number,
  clanScore: Number,
  requiredTrophies: Number,
  donationsPerWeek: Number,
  clanChestStatus: String,
  clanChestPoints: Number,
  clanChestLevel: Number,
  clanChestMaxLevel: Number,
  members: Number,
  location: LocationSchema,
  memberList: [MemberSchema],
  lastUpdate: {
    type: Date,
    default: Date.now
  }
})

export default ClanSchema
