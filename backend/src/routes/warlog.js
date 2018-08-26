import express from 'express'
import Warlog from './../models/warlog'
const router = express.Router()

router.get('/api/warlog', (req, res, next) =>
  Warlog.find()
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit || 20)
    .then(warlog => res.send(warlog))
)

// Upsert, will insert if no record with that createdDate, otherwise will update
router.post('/api/warlog', (req, res, next) =>
  Warlog.findOneAndUpdate(
    { createdDate: req.body.warlog.createdDate },
    req.body.warlog,
    { upsert: true }
  )
    .then(warlog => res.send(warlog))
    .catch(err => res.status(400).send(err))
)

router.get('/api/war/:date', (req, res, next) =>
  Warlog.findOne({ createdDate: req.params.date })
    .then(war => res.send(war))
    .catch(err => res.status(400).send(err))
)

router.delete('/api/warlog', (req, res, next) =>
  Warlog.deleteOne({ _id: req.body.id })
    .then(suc => res.send({ msg: `Warlog ${req.body.id} deleted` }))
    .catch(err => res.status(400).send(err))
)

export default router
