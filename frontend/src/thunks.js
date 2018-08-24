import axios from 'axios'
import { receivePlayers, errPlayers, receiveClan, errClan } from './redux'

export const getPlayers = () => dispatch =>
  axios
    .get('/api/players')
    .then(({ data }) => data)
    .then(players => dispatch(receivePlayers(players)))
    .catch(err => dispatch(errPlayers(err)))

export const getClan = () => dispatch =>
  axios
    .get('/api/clan/tag/%2389PPCGU8')
    .then(({ data }) => data)
    .then(clan => dispatch(receiveClan(clan)))
    .catch(err => dispatch(errClan(err)))
