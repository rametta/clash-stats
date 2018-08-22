import dayjs from 'dayjs'
import { compose } from 'sanctuary'
import { Diff } from './unionTypes'

const formatPlayer = player => ({
  ...player,
  totalDonationsFormatted: player.totalDonations.toLocaleString(),
  clanCardsCollectedFormatted: player.clanCardsCollected.toLocaleString(),
  lastUpdate: dayjs(player.lastUpdate).format('MMM D YYYY h:mm A'),
  winRatio: (player.wins / player.losses).toFixed(2),
  winLossDiff: compose(
    diff =>
      diff > 0
        ? Diff.Positive(diff)
        : diff < 0
          ? Diff.Negative(diff)
          : Diff.Neutral(diff)
  )(p => p.wins - p.losses)(player)
})

export const sortPlayers = sort => players =>
  players.sort((x, y) =>
    sort.cata({
      Asc: prop => x[prop] - y[prop],
      Desc: prop => y[prop] - x[prop]
    })
  )

export const formatPlayers = players => players.map(formatPlayer)
