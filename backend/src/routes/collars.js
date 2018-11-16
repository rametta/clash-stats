
import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/api/country', (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip || req.ips
  axios.get(`http://api.ipstack.com/${ip}?access_key=6b0387c0b15a584c17e96667afee16e7&fields=country_code&output=json`)
  .then(({ data }) => res.json(data))
})

export default router
