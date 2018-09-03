import mongoose from 'mongoose'
import CurrentWarSchema from './../schemas/currentWar'

const CurrentWar = mongoose.model('currentWar', CurrentWarSchema)

export default CurrentWar
