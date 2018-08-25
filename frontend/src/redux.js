import { formatPlayers, formatClan, sortPlayers } from './formatters'
import { Data, Sort, DialogStatus } from './unionTypes'

const types = {
  PLAYERS_RES: 'PLAYERS_RES',
  PLAYERS_ERR: 'PLAYERS_ERR',
  CLAN_RES: 'CLAN_RES',
  CLAN_ERR: 'CLAN_ERR',
  OPEN_CHANGELOG: 'OPEN_CHANGELOG',
  CLOSE_CHANGELOG: 'CLOSE_CHANGELOG'
}

export const receivePlayers = payload => ({ type: types.PLAYERS_RES, payload })
export const errPlayers = payload => ({ type: types.PLAYERS_ERR, payload })
export const receiveClan = payload => ({ type: types.CLAN_RES, payload })
export const errClan = payload => ({ type: types.CLAN_ERR, payload })
export const openChangelog = () => ({ type: types.OPEN_CHANGELOG })
export const closeChangelog = () => ({ type: types.CLOSE_CHANGELOG })

const init = {
  players: Data.Loading,
  clan: Data.Loading,
  changelog: DialogStatus.Closed
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
        clan: Data.List(formatClan(payload))
      }

    case types.CLAN_ERR:
      return {
        ...state,
        clan: Data.Error(payload)
      }

    case types.OPEN_CHANGELOG:
      return {
        ...state,
        changelog: DialogStatus.Opened
      }

    case types.CLOSE_CHANGELOG:
      return {
        ...state,
        changelog: DialogStatus.Closed
      }

    default:
      return state
  }
}
