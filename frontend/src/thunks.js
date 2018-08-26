import axios from 'axios'
import { formatWar } from './formatters'
import {
  receivePlayers,
  errPlayers,
  receiveClan,
  errClan,
  receiveWarlog,
  errWarlog,
  receiveWar,
  errWar
} from './redux'

export const getPlayers = () => dispatch =>
  axios
    .get('/api/players')
    .then(({ data }) => data)
    .then(players => dispatch(receivePlayers(players)))
    .catch(err =>
      dispatch(errPlayers("There's been an error. We'll fix it soon!"))
    )

export const getClan = () => dispatch =>
  axios
    .get('/api/clan/tag/%2389PPCGU8')
    .then(({ data }) => data)
    .then(clan => dispatch(receiveClan(clan)))
    .catch(err =>
      dispatch(errClan("There's been an error. We'll fix it soon!"))
    )

export const getWarlog = () => dispatch =>
  axios
    .get('/api/warlog')
    .then(({ data }) => data)
    .then(warlog => dispatch(receiveWarlog(warlog)))
    .catch(err =>
      dispatch(errWarlog("There's been an error. We'll fix it soon!"))
    )

export const getWar = date => (dispatch, getState) => {
  const war = getState().warlog.cata({
    List: warlog => warlog.find(w => w.createdDate === date),
    Error: () => null,
    Loading: () => null
  })

  war
    ? dispatch(receiveWar(war))
    : axios
        .get(`/api/war/${date}`)
        .then(({ data }) => data)
        .then(war => dispatch(receiveWar(formatWar(war))))
        .catch(err =>
          dispatch(errWar("There's been an error. We'll fix it soon!"))
        )
}
