import dotenv from 'dotenv'
import express from 'express'
import axios from 'axios'
import { tryP, parallel } from 'fluture'
import Clan from './../models/clan'
const router = express.Router()
dotenv.config()

const CLASH = process.env.CLASH_API_URL
const TOKEN = process.env.CLASH_TOKEN

const fetchClanUpdate = clan =>
  tryP(() =>
    axios.get(`${CLASH}/v1/clans/${encodeURIComponent(clan.tag)}`, {
      headers: { Authorization: `Bearer  ${TOKEN}` }
    })
  ).map(({ data }) => ({ ...data, lastUpdate: Date.now() }))

const updateClan = clan =>
  tryP(() => Clan.findOneAndUpdate({ tag: clan.tag }, clan))

router.get('/api/update-clans', (req, res, next) =>
  tryP(() => Clan.find())
    .map(clans => clans.map(fetchClanUpdate))
    .chain(clans => parallel(Infinity, clans))
    .map(clans => clans.map(updateClan))
    .chain(clans => parallel(Infinity, clans))
    .fork(e => res.status(500).send(e), r => res.send(r))
)

router.get('/api/clans', (req, res, next) =>
  Clan.find().then(clans => res.send(clans))
)

router.get('/api/clan/tag/:tag', (req, res, next) =>
  Clan.findOne({ tag: req.params.tag }).then(clan => res.send(clan))
)

export default router
