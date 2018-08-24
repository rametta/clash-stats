import { formatPlayers, sortPlayers } from './formatters'
import { Data, Sort } from './unionTypes'

// Action types
const types = {
  PLAYERS_RES: 'PLAYERS_RES',
  PLAYERS_ERR: 'PLAYERS_ERR',
  CLAN_RES: 'CLAN_RES',
  CLAN_ERR: 'CLAN_ERR'
}

// Actions
export const receivePlayers = payload => ({ type: types.PLAYERS_RES, payload })
export const errPlayers = payload => ({ type: types.PLAYERS_ERR, payload })
export const receiveClan = payload => ({ type: types.CLAN_RES, payload })
export const errClan = payload => ({ type: types.CLAN_ERR, payload })

// Initial State
const init = {
  players: Data.Loading,
  clan: Data.Loading
}

export default (state = init, { type, payload }) => {
  switch (type) {
    case types.PLAYERS_RES:
      return {
        ...state,
        players: Data.List(
          sortPlayers(Sort.Desc('trophies'))(formatPlayers(payload))
        )
      }

    case types.PLAYERS_ERR:
      return {
        ...state,
        players: Data.Error(payload)
      }

    case types.CLAN_RES:
      return {
        ...state,
        clan: Data.List(payload)
      }

    case types.CLAN_ERR:
      return {
        ...state,
        clan: Data.Error(payload)
      }

    default:
      return state
  }
}
