import { formatPlayers, sortPlayers } from './formatters'
import { Loader, Players, Sort } from './unionTypes'

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
  players: Players.List([]),
  playersLoading: Loader.Idle
}

export default (state = init, { type, payload }) => {
  switch (type) {
    case types.PLAYERS_RES:
      return {
        ...state,
        playersLoading: Loader.Idle,
        players: Players.List(
          sortPlayers(Sort.Desc('trophies'))(formatPlayers(payload))
        )
      }
    case types.PLAYERS_ERR:
      return {
        ...state,
        playersLoading: Loader.Idle,
        players: Players.Error(payload)
      }
    default:
      return state
  }
}
