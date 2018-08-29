import { compose } from 'sanctuary'
import { Diff, Standing, Medal } from './unionTypes'

const formatPlayer = player => ({
  ...player,
  trophiesFormatted: player.trophies.toLocaleString(),
  totalDonationsFormatted: player.totalDonations.toLocaleString(),
  clanCardsCollectedFormatted: player.clanCardsCollected.toLocaleString(),
  battlesFormatted: player.battleCount.toLocaleString(),
  winsFormatted: player.wins.toLocaleString(),
  lossesFormatted: player.losses.toLocaleString(),
  threeCrownWinsFormatted: player.threeCrownWins.toLocaleString(),
  winRatio: (player.wins / player.losses).toFixed(2),
  winLossDiffNum: player.wins - player.losses,
  winLossDiff: compose(getDiff)(p => p.wins - p.losses)(player)
})

export const sort = (direction, prop) => players =>
  direction === 'asc'
    ? players.sort((x, y) => x[prop] - y[prop])
    : players.sort((x, y) => y[prop] - x[prop])

export const formatPlayers = players => players.map(formatPlayer)

export const formatClan = clan => ({
  ...clan,
  donationsFormatted: clan.donationsPerWeek.toLocaleString()
})

const getCrew = warlog => warlog.standings.find(s => s.clan.tag === '#89PPCGU8')

const getDiff = trophyChange =>
  trophyChange > 0
    ? Diff.Positive(trophyChange)
    : trophyChange < 0
      ? Diff.Negative(trophyChange)
      : Diff.Neutral(trophyChange)

const standing = standing =>
  standing === '1st'
    ? Standing.First(standing)
    : standing === '2nd'
      ? Standing.Second(standing)
      : standing === '3rd'
        ? Standing.Third(standing)
        : standing === '4th'
          ? Standing.Fourth(standing)
          : Standing.Fifth(standing)

export const formatWar = warlog =>
  compose(crew => ({
    ...warlog,
    crew,
    trophyChange: getDiff(crew.trophyChange),
    standing: standing(warlog.standing),
    standings: warlog.standings.map(standing => ({
      ...standing,
      selected: standing.clan.tag === crew.clan.tag,
      trophyChange: getDiff(standing.trophyChange)
    })),
    participants: warlog.participants
      .sort((x, y) => y.wins - x.wins)
      .map(p => ({
        ...p,
        medal: p.wins === 2 ? Medal.Two : p.wins === 1 ? Medal.One : Medal.Zero
      }))
  }))(getCrew)(warlog)

export const formatWarlogs = warlogs => warlogs.map(formatWar)
