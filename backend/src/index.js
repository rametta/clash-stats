import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import player from './routes/player'
import clan from './routes/clan'
const app = express()
dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(player)
app.use(clan)

mongoose.Promise = global.Promise
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log('Listening on port:', process.env.PORT)
    )
  )
  .catch(() => console.log('Could not connect to DB'))
