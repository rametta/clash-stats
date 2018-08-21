import mongoose from 'mongoose'
import ClanSchema from './../schemas/clan'

const Clan = mongoose.model('clan', ClanSchema)

export default Clan
