import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'
import { tryP, parallel } from 'fluture'
import Player from './../models/player'
import Clan from './../models/clan'
const router = express.Router()
dotenv.config()

const CLASH = process.env.CLASH_API_URL
const TOKEN = process.env.CLASH_TOKEN

const fetchPlayerUpdates = tag =>
  tryP(() =>
    axios.get(`${CLASH}/v1/players/${encodeURIComponent(tag)}`, {
      headers: { Authorization: `Bearer  ${TOKEN}` }
    })
  ).map(({ data }) => ({ ...data, lastUpdate: Date.now() }))

const updatePlayer = player =>
  tryP(() =>
    Player.findOneAndUpdate({ tag: player.tag }, player, {
      upsert: true
    })
  )

router.get('/api/update-players', (req, res, next) =>
  tryP(() => Clan.findOne({ tag: '#89PPCGU8' }))
    .map(clan => clan.memberList.map(m => m.tag))
    .map(tags => tags.map(fetchPlayerUpdates))
    .chain(updates => parallel(Infinity, updates))
    .map(players => players.map(updatePlayer))
    .chain(players => parallel(Infinity, players))
    .fork(e => res.status(500).send(e), r => res.send(r))
)

router.get('/api/players', (req, res, next) =>
  Player.find()
    .select('-achievements -cards -currentDeck -clan -leagueStatistics -_id')
    .then(players => res.send(players))
)

router.get('/api/player/:tag', (req, res, next) =>
  Player.find({ tag: req.params.tag }).then(player => res.send(player))
)

// This route will clean up the Player collection
// by removing all players that are not in the clan
// anymore. Should be ran once an hour.
router.get('/api/playerpurge', (req, res, next) =>
  Clan.findOne({ tag: '#89PPCGU8' })
    .then(clan => clan.memberList)
    .then(members => members.map(m => m.tag))
    .then(tags => Player.find({ tag: { $nin: tags } }))
    .then(members => members.map(m => m._id))
    .then(ids => Player.deleteMany({ _id: { $in: ids } }))
    .then(result => res.send(result))
    .catch(err => res.status(400).send(err))
)

export default router
