import express from 'express'
import dayjs from 'dayjs'
import Warlog from './../models/warlog'
const router = express.Router()

const formatWarlog = warlog => ({
  ...warlog._doc,
  lastUpdateFormatted: dayjs(warlog.lastUpdate).format('MMM D YYYY h:mm A'),
  createdDateFormatted: dayjs(warlog.createdDateClean).format('MMM D, YYYY')
})

router.get('/api/warlog', (req, res, next) =>
  Warlog.find()
    .sort('-createdDateClean')
    .skip(+req.query.skip || 0)
    .limit(+req.query.limit || 30)
    .then(warlogs => warlogs.map(formatWarlog))
    .then(warlogs => res.send(warlogs))
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
