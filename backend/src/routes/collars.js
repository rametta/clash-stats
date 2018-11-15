
import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/api/country', (req, res, next) => 
  axios.get('http://api.ipstack.com/check?access_key=6b0387c0b15a584c17e96667afee16e7&fields=country_code&output=json')
    .then(({ data }) => res.json(data))
)

export default router
