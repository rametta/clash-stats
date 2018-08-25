import dayjs from 'dayjs'
import { compose } from 'sanctuary'
import { Diff } from './unionTypes'

const formatDate = date => dayjs(date).format('MMM D YYYY h:mm A')

const formatPlayer = player => ({
  ...player,
  totalDonationsFormatted: player.totalDonations.toLocaleString(),
  clanCardsCollectedFormatted: player.clanCardsCollected.toLocaleString(),
  lastUpdate: formatDate(player.lastUpdate),
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

export const formatClan = clan => ({
  ...clan,
  lastUpdate: formatDate(clan.lastUpdate),
  donationsFormatted: clan.donationsPerWeek.toLocaleString()
})
