import { formatPlayers, sortPlayers } from './formatters'
import { Players, Sort } from './unionTypes'

// Action types
const types = {
  PLAYERS_RES: 'PLAYERS_RES',
  PLAYERS_ERR: 'PLAYERS_ERR'
}

// Actions
export const receivePlayers = payload => ({ type: types.PLAYERS_RES, payload })
export const errPlayers = payload => ({ type: types.PLAYERS_ERR, payload })

// Initial State
const init = {
  players: Players.Loading
}

export default (state = init, { type, payload }) => {
  switch (type) {
    case types.PLAYERS_RES:
      return {
        ...state,
        players: Players.List(
          sortPlayers(Sort.Desc('trophies'))(formatPlayers(payload))
        )
      }
    case types.PLAYERS_ERR:
      return {
        ...state,
        players: Players.Error(payload)
      }
    default:
      return state
  }
}
