import mongoose from 'mongoose'
import PlayerSchema from './../schemas/player'

const Player = mongoose.model('player', PlayerSchema)

export default Player
