import mongoose from 'mongoose'
import WarlogSchema from './../schemas/warlog'

const Warlog = mongoose.model('warlog', WarlogSchema)

export default Warlog
