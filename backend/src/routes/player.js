import express from 'express'
import Player from './../models/player'
const router = express.Router()

router.get('/api/players', (req, res, next) =>
  Player.find({}).then(players => res.send(players))
)

router.get('/api/player/:id', (req, res, next) =>
  Player.findById(req.params.id).then(player => res.send(player))
)

router.post('/api/player', (req, res, next) =>
  new Player(req.body.player)
    .save()
    .then(player => res.send(player))
    .catch(err => res.status(400).send(err))
)

router.put('/api/player', (req, res, next) =>
  Garden.updateOne({ _id: req.body.player.id }, req.body.player)
    .then(player => res.send(player))
    .catch(err => res.status(400).send(err))
)

router.delete('/api/player', (req, res, next) =>
  Garden.remove({ _id: req.body.id })
    .then(suc => res.send({ msg: `Player ${req.body.id} deleted` }))
    .catch(err => res.status(400).send(err))
)

export default router
