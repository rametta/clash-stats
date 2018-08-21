import express from 'express'
import Clan from './../models/clan'
const router = express.Router()

router.get('/api/clans', (req, res, next) =>
  Clan.find().then(clans => res.send(clans))
)

router.get('/api/clan/:id', (req, res, next) =>
  Clan.findById(req.params.id).then(clan => res.send(clan))
)

router.get('/api/clan/tag/:tag', (req, res, next) =>
  Clan.findOne({ tag: req.params.tag }).then(clan => res.send(clan))
)

router.post('/api/clan', (req, res, next) =>
  new Clan(req.body.clan)
    .save()
    .then(clan => res.send(clan))
    .catch(err => res.status(400).send(err))
)

router.put('/api/clan', (req, res, next) =>
  Clan.updateOne({ _id: req.body.clan._id }, req.body.clan)
    .then(clan => res.send(clan))
    .catch(err => res.status(400).send(err))
)

router.delete('/api/clan', (req, res, next) =>
  Clan.remove({ _id: req.body.id })
    .then(suc => res.send({ msg: `Clan ${req.body.id} deleted` }))
    .catch(err => res.status(400).send(err))
)

export default router
