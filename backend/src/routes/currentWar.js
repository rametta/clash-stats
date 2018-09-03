import express from 'express'
import CurrentWar from './../models/currentWar'
import dotenv from 'dotenv'
import axios from 'axios'
import { tryP } from 'fluture'
const router = express.Router()
dotenv.config()

const CLASH = process.env.CLASH_API_URL
const TOKEN = process.env.CLASH_TOKEN

const update = war =>
  tryP(() =>
    CurrentWar.findOneAndUpdate({ war: 1 }, war, {
      upsert: true
    })
  )

const cleanDate = d =>
  `${d.substr(0, 4)}-${d.substr(4, 2)}-${d.substr(6, 5)}:${d.substr(
    11,
    2
  )}:${d.substr(13, 7)}`

const clean = war => ({
  ...war,
  lastUpdate: Date.now()
})

router.get('/api/update-currentwar', (req, res, next) =>
  tryP(() =>
    axios.get(`${CLASH}/v1/clans/%2389PPCGU8/currentwar`, {
      headers: { Authorization: `Bearer  ${TOKEN}` }
    })
  )
    .map(({ data }) => data)
    .map(clean)
    .chain(update)
    .fork(e => res.status(500).send(e), r => res.send(r))
)

router.get('/api/currentwar', (req, res, next) =>
  CurrentWar.findOne({ war: 1 })
    .select('-__v -_id -war')
    .then(war => ({
      ...war._doc,
      cleanCollectionEndTime: cleanDate(war.collectionEndTime)
    }))
    .then(war => res.send(war))
)

export default router
