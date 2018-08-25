import dayjs from 'dayjs'
import { compose } from 'sanctuary'
import { Diff, Standing } from './unionTypes'

const formatDate = dateStr => dayjs(dateStr).format('MMM D YYYY h:mm A')

const cleanDate = d =>
  `${d.substr(0, 4)}-${d.substr(4, 2)}-${d.substr(6, 5)}:${d.substr(
    11,
    2
  )}:${d.substr(13, 6)}`

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

const getCrew = warlog => warlog.standings.find(s => s.clan.tag === '#89PPCGU8')

const formatWarlog = warlog =>
  compose(crew => ({
    ...warlog,
    createdDateFormatted: dayjs(cleanDate(warlog.createdDate)).format(
      'MMM D YYYY'
    ),
    lastUpdateFormatted: formatDate(warlog.lastUpdate),
    crew,
    trophyChange:
      crew.trophyChange > 0
        ? Diff.Positive(crew.trophyChange)
        : crew.trophyChange < 0
          ? Diff.Negative(crew.trophyChange)
          : Diff.Neutral(crew.trophyChange),
    standing:
      warlog.standing === '1st'
        ? Standing.First(warlog.standing)
        : warlog.standing === '2nd'
          ? Standing.Second(warlog.standing)
          : warlog.standing === '3rd'
            ? Standing.Third(warlog.standing)
            : warlog.standing === '4th'
              ? Standing.Fourth(warlog.standing)
              : Standing.Fifth(warlog.standing)
  }))(getCrew)(warlog)

export const formatWarlogs = warlogs => warlogs.map(formatWarlog)
