import express from 'express'
import playerJSON from './fixtures/player.json'
const app = express()
const PORT = 4000

app.get('/player', (req, res) => {
  res.send(playerJSON)
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
