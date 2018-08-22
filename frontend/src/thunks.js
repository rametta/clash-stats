import axios from 'axios'
import { receivePlayers, errPlayers } from './redux'

export const getPlayers = () => dispatch =>
  axios
    .get('/api/players')
    .then(({ data }) => data)
    .then(players => dispatch(receivePlayers(players)))
    .catch(err => dispatch(errPlayers(err)))
