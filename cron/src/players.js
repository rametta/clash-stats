import axios from 'axios'
import dotenv from 'dotenv'
import { tryP, parallel } from 'fluture'
dotenv.config()

const API = process.env.API_URL
const CLASH = process.env.CLASH_API_URL
const TOKEN = process.env.CLASH_TOKEN

/**
 * Run this script with a cron job. Every 5 mins
 *
 * This script has 3 steps:
 * 1. Fetch users to update from our API
 * 2. Fetch updates from Clash Royale API for every user
 * 3. Post Updates back to our API
 */

// players :: Future Array Player
const players = () =>
  tryP(() => axios.get(`${API}/api/players`)).map(({ data }) => data)

// fetchPlayerUpdates :: Player -> Future Player
const fetchPlayerUpdates = player =>
  tryP(() =>
    axios.get(`${CLASH}/v1/players/${encodeURIComponent(player.tag)}`, {
      headers: { Authorization: `Bearer  ${TOKEN}` }
    })
  ).map(({ data }) => Object.assign({}, data, { _id: player._id }))

// updatePlayer :: Player -> Future Player
const updatePlayer = player =>
  tryP(() => axios.put(`${API}/api/player`, { player })).map(({ data }) => data)

// updateTime :: Player -> Player
const updateTime = player =>
  Object.assign({}, player, { lastUpdate: Date.now() })

players()
  .map(users => users.map(fetchPlayerUpdates))
  .chain(users => parallel(Infinity, users))
  .map(users => users.map(updateTime))
  .map(users => users.map(updatePlayer))
  .chain(users => parallel(Infinity, users))
  .fork(console.error, console.log)
