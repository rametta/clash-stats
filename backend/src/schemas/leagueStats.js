import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CurrentSeasonSchema = new Schema({
  trophies: Number,
  bestTrophies: Number
})

const BestSeasonSchema = new Schema({
  id: String,
  trohpies: Number
})

const LeagueStatsSchema = new Schema({
  currentSeason: CurrentSeasonSchema,
  bestSeasonSeason: BestSeasonSchema
})

export default LeagueStatsSchema
