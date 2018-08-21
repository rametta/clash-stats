import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import player from './routes/player'
const app = express()
const PORT = 4000
dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(player)

mongoose.Promise = global.Promise
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => app.listen(PORT, () => console.log('Listening on port:', PORT)))
  .catch(() => console.log('Could not connect to DB'))
