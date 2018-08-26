import express from 'express'
import Player from './../models/player'
import Clan from './../models/clan'
const router = express.Router()

router.get('/api/players', (req, res, next) =>
  Player.find().then(players => res.send(players))
)

router.get('/api/player/:id', (req, res, next) =>
  Player.findById(req.params.id).then(player => res.send(player))
)

// Upsert, will insert if no record with that tag, otherwise will update
router.post('/api/player', (req, res, next) =>
  Player.findOneAndUpdate({ tag: req.body.player.tag }, req.body.player, {
    upsert: true
  })
    .then(player => res.send(player))
    .catch(err => res.status(400).send(err))
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

router.delete('/api/player', (req, res, next) =>
  Player.remove({ _id: req.body.id })
    .then(suc => res.send({ msg: `Player ${req.body.id} deleted` }))
    .catch(err => res.status(400).send(err))
)

export default router
