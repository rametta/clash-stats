import axios from 'axios'
import dotenv from 'dotenv'
import { tryP } from 'fluture'
dotenv.config()

const API = process.env.API_URL
const CLASH = process.env.CLASH_API_URL
const TOKEN = process.env.CLASH_TOKEN

/**
 * Run this script with a cron job.
 *
 * This script has 3 steps:
 * 1. Fetch clan to update from our API
 * 2. Fetch updated clan from Clash Royale API
 * 3. Post Update back to our API
 */

// clan :: Future Clan
const clan = () =>
  tryP(() => axios.get(`${API}/api/clans`)).map(({ data }) => data)

// fetchClanUpdate :: Clan -> Future Clan
const fetchClanUpdate = clan =>
  tryP(() =>
    axios.get(`${CLASH}/v1/clans/${encodeURIComponent(clan.tag)}`, {
      headers: { Authorization: `Bearer  ${TOKEN}` }
    })
  ).map(({ data }) => Object.assign({}, data, { _id: clan._id }))

// updateClan :: Clan -> Future Clan
const updateClan = clan =>
  tryP(() => axios.put(`${API}/api/clan`, { clan })).map(({ data }) => data)

// updateTime :: Clan -> Clan
const updateTime = clan => Object.assign({}, clan, { lastUpdate: Date.now() })

clan()
  .map(clans => clans[0])
  .chain(fetchClanUpdate)
  .map(updateTime)
  .chain(updateClan)
  .fork(console.error, console.log)
