import {
  formatPlayers,
  formatClan,
  formatWarlogs,
  formatWar,
  formatCurrentWar,
  sort
} from './formatters'
import { Data, DialogStatus } from './unionTypes'

const types = {
  PLAYERS_RES: 'PLAYERS_RES',
  PLAYERS_ERR: 'PLAYERS_ERR',
  PLAYERS_SORT: 'PLAYERS_SORT',
  CLAN_RES: 'CLAN_RES',
  CLAN_ERR: 'CLAN_ERR',
  CLAN_MEMBER_SORT: 'CLAN_MEMBER_SORT',
  WARLOG_RES: 'WARLOG_RES',
  WARLOG_ERR: 'WARLOG_ERR',
  WAR_RES: 'WAR_RES',
  WAR_ERR: 'WAR_ERR',
  CURRENT_WAR_RES: 'CURRENT_WAR_RES',
  CURRENT_WAR_ERR: 'CURRENT_WAR_ERR',
  OPEN_CHANGELOG: 'OPEN_CHANGELOG',
  CLOSE_CHANGELOG: 'CLOSE_CHANGELOG'
}

export const openChangelog = () => ({ type: types.OPEN_CHANGELOG })
export const closeChangelog = () => ({ type: types.CLOSE_CHANGELOG })
export const receivePlayers = payload => ({ type: types.PLAYERS_RES, payload })
export const errPlayers = payload => ({ type: types.PLAYERS_ERR, payload })
export const sortPlayers = payload => ({ type: types.PLAYERS_SORT, payload })
export const receiveClan = payload => ({ type: types.CLAN_RES, payload })
export const errClan = payload => ({ type: types.CLAN_ERR, payload })
export const sortClanMembers = payload => ({
  type: types.CLAN_MEMBER_SORT,
  payload
})
export const receiveWarlog = payload => ({ type: types.WARLOG_RES, payload })
export const errWarlog = payload => ({ type: types.WARLOG_ERR, payload })
export const receiveWar = payload => ({ type: types.WAR_RES, payload })
export const errWar = payload => ({ type: types.WAR_ERR, payload })
export const receiveCurrentWar = payload => ({
  type: types.CURRENT_WAR_RES,
  payload
})
export const errCurrentWar = payload => ({
  type: types.CURRENT_WAR_ERR,
  payload
})

const init = {
  players: Data.Loading,
  playersSortProp: 'trophies',
  playersSortDir: 'desc',

  clan: Data.Loading,
  clanSortProp: 'trophies',
  clanSortDir: 'desc',

  warlog: Data.Loading,
  war: Data.Loading,
  currentWar: Data.Loading,
  changelog: DialogStatus.Closed
}

export default (state = init, { type, payload }) => {
  switch (type) {
    case types.PLAYERS_RES:
      return {
        ...state,
        players: Data.List(
          sort(state.playersSortDir, state.playersSortProp)(
            formatPlayers(payload)
          )
        )
      }

    case types.PLAYERS_ERR:
      return {
        ...state,
        players: Data.Error(payload)
      }

    case types.PLAYERS_SORT:
      const direction = state.playersSortDir === 'desc' ? 'asc' : 'desc'

      return state.players.cata({
        List: players => ({
          ...state,
          players: Data.List(sort(direction, payload)(players)),
          playersSortDir: direction,
          playersSortProp: payload
        }),
        Loading: () => state,
        Error: () => state
      })

    case types.CLAN_MEMBER_SORT:
      const dir = state.clanSortDir === 'desc' ? 'asc' : 'desc'

      return state.clan.cata({
        List: clan => ({
          ...state,
          clanSortProp: payload,
          clanSortDir: dir,
          clan: Data.List({
            ...clan,
            memberList: sort(dir, payload)(clan.memberList)
          })
        }),
        Loading: () => state,
        Error: () => state
      })

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
        war: Data.List(formatWar(payload))
      }

    case types.WAR_ERR:
      return {
        ...state,
        war: Data.Error(payload)
      }

    case types.CURRENT_WAR_RES:
      return {
        ...state,
        currentWar: Data.List(formatCurrentWar(payload))
      }

    case types.CURRENT_WAR_ERR:
      return {
        ...state,
        currentWar: Data.Error(payload)
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
