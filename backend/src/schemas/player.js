import mongoose from 'mongoose'
import ArenaSchema from './arena'
import LeagueStatsSchema from './leagueStats'
import AchievementSchema from './achievement'
import CardSchema from './card'

const Schema = mongoose.Schema

const PlayerSchema = new Schema({
  tag: { type: String, required: [true, 'Player tag is required'] },
  name: String,
  expLevel: Number,
  trophies: Number,
  bestTrophies: Number,
  wins: Number,
  losses: Number,
  battleCount: Number,
  threeCrownWins: Number,
  challengeCardsWon: Number,
  challengeMaxWins: Number,
  tournamentCardsWon: Number,
  tournamentBattleCount: Number,
  donations: Number,
  donationsReceived: Number,
  totalDonations: Number,
  warDayWins: Number,
  clanCardsCollected: Number,
  arena: ArenaSchema,
  leagueStatistics: LeagueStatsSchema,
  achievements: [AchievementSchema],
  cards: [CardSchema],
  currentDeck: [CardSchema],
  currentDeckFavouriteCard: CardSchema,
  lastUpdate: {
    type: Date,
    default: Date.now
  }
})

export default PlayerSchema
