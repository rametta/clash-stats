import express from 'express'
import Warlog from './../models/warlog'
import dotenv from 'dotenv'
import axios from 'axios'
import numeral from 'numeral'
import { tryP, parallel } from 'fluture'
const router = express.Router()
dotenv.config()

const CLASH = process.env.CLASH_API_URL
const TOKEN = process.env.CLASH_TOKEN

const update = warlog =>
  tryP(() =>
    Warlog.findOneAndUpdate({ createdDate: warlog.createdDate }, warlog, {
      upsert: true
    })
  )

const cleanDate = d =>
  `${d.substr(0, 4)}-${d.substr(4, 2)}-${d.substr(6, 5)}:${d.substr(
    11,
    2
  )}:${d.substr(13, 7)}`

const clean = warlog => ({
  ...warlog,
  lastUpdate: Date.now(),
  createdDateClean: cleanDate(warlog.createdDate),
  standing: numeral(
    warlog.standings.findIndex(s => s.clan.tag === '#89PPCGU8') + 1
  ).format('0o')
})

router.get('/api/update-warlogs', (req, res, next) =>
  tryP(() =>
    axios.get(`${CLASH}/v1/clans/%2389PPCGU8/warlog`, {
      headers: { Authorization: `Bearer  ${TOKEN}` }
    })
  )
    .map(({ data }) => data.items)
    .map(logs => logs.map(clean))
    .map(logs => logs.map(update))
    .chain(updates => parallel(Infinity, updates))
    .fork(e => res.status(500).send(e), r => res.send(r))
)

router.get('/api/warlog', (req, res, next) =>
  Warlog.find()
    .select('-_id -__v')
    .sort('-createdDateClean')
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit || 30)
    .then(warlogs => res.send(warlogs))
)

router.get('/api/war/:date', (req, res, next) =>
  Warlog.findOne({ createdDate: req.params.date })
    .then(war => res.send(war))
    .catch(err => res.status(400).send(err))
)

export default router
