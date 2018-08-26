import {
  formatPlayers,
  formatClan,
  formatWarlogs,
  sortPlayers
} from './formatters'
import { Data, Sort, DialogStatus } from './unionTypes'

const types = {
  PLAYERS_RES: 'PLAYERS_RES',
  PLAYERS_ERR: 'PLAYERS_ERR',
  CLAN_RES: 'CLAN_RES',
  CLAN_ERR: 'CLAN_ERR',
  WARLOG_RES: 'WARLOG_RES',
  WARLOG_ERR: 'WARLOG_ERR',
  WAR_RES: 'WAR_RES',
  WAR_ERR: 'WAR_ERR',
  OPEN_CHANGELOG: 'OPEN_CHANGELOG',
  CLOSE_CHANGELOG: 'CLOSE_CHANGELOG'
}

export const openChangelog = () => ({ type: types.OPEN_CHANGELOG })
export const closeChangelog = () => ({ type: types.CLOSE_CHANGELOG })
export const receivePlayers = payload => ({ type: types.PLAYERS_RES, payload })
export const errPlayers = payload => ({ type: types.PLAYERS_ERR, payload })
export const receiveClan = payload => ({ type: types.CLAN_RES, payload })
export const errClan = payload => ({ type: types.CLAN_ERR, payload })
export const receiveWarlog = payload => ({ type: types.WARLOG_RES, payload })
export const errWarlog = payload => ({ type: types.WARLOG_ERR, payload })
export const receiveWar = payload => ({ type: types.WAR_RES, payload })
export const errWar = payload => ({ type: types.WAR_ERR, payload })

const init = {
  players: Data.Loading,
  clan: Data.Loading,
  warlog: Data.Loading,
  war: Data.Loading,
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

    case types.WARLOG_RES:
      return {
        ...state,
        warlog: Data.List(formatWarlogs(payload))
      }

    case types.WARLOG_ERR:
      return {
        ...state,
        warlog: Data.Error(payload)
      }

    case types.WAR_RES:
      return {
        ...state,
        war: Data.List(payload)
      }

    case types.WAR_ERR:
      return {
        ...state,
        war: Data.Error(payload)
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
