import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import player from './routes/player'
import clan from './routes/clan'
import warlog from './routes/warlog'
import currentWar from './routes/currentWar'
import collars from './routes/collars'

const app = express()
dotenv.config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(player)
app.use(clan)
app.use(warlog)
app.use(currentWar)
app.use(collars)

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
