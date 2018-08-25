import axios from 'axios'
import dotenv from 'dotenv'
import numeral from 'numeral'
import { tryP, parallel } from 'fluture'
dotenv.config()

const API = process.env.API_URL
const CLASH = process.env.CLASH_API_URL
const TOKEN = process.env.CLASH_TOKEN

/**
 * Run this script with a cron job.
 *
 * This script has 2 steps:
 * 1. Fetch warlog from Clash Royale API
 * 2. Post Updates back to our API
 */

// fetchWarlog :: Future Warlog
const fetchWarlog = () =>
  tryP(() =>
    axios.get(`${CLASH}/v1/clans/%2389PPCGU8/warlog`, {
      headers: { Authorization: `Bearer  ${TOKEN}` }
    })
  ).map(({ data }) => data)

// updateWarlog :: Warlog -> Future Warlog
const updateWarlog = warlog =>
  tryP(() => axios.post(`${API}/api/warlog`, { warlog })).map(
    ({ data }) => (data ? 'Updated' : 'Inserted')
  )

// clean :: Warlog -> Warlog
const clean = warlog =>
  Object.assign({}, warlog, {
    lastUpdate: Date.now(),
    standing: numeral(
      warlog.standings.findIndex(s => s.clan.tag === '#89PPCGU8') + 1
    ).format('0o')
  })

fetchWarlog()
  .map(({ items }) => items)
  .map(warlogs => warlogs.map(clean))
  .map(warlogs => warlogs.map(updateWarlog))
  .chain(warlogs => parallel(2, warlogs))
  .fork(console.error, console.log)
