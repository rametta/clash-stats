import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'
import Fade from '@material-ui/core/Fade'

import { ErrorCard } from '../reusable/errorCard'
import { getPlayers } from './../../thunks'
import { sortPlayers } from '../../redux'

const styles = {
  root: {
    margin: '1em',
    overflowX: 'auto'
  },
  nowrap: {
    whiteSpace: 'nowrap'
  },
  table: {
    minWidth: 700
  },
  green: {
    color: '#2ee82e'
  },
  red: {
    color: '#e82e2e'
  }
}

class HomeUnstyled extends Component {
  componentDidMount() {
    this.props.getPlayers()
  }

  render() {
    const {
      classes,
      players,
      sortPlayers,
      playersSortProp,
      playersSortDir
    } = this.props
    return players.cata({
      List: list => (
        <Fade in={true}>
          <Grid container justify="center">
            <Grid item xs={12} sm={12} md={10} lg={10} xl={8}>
              <Paper elevation={8} className={classes.root}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="dense" className={classes.nowrap}>
                        User
                      </TableCell>
                      <TableCell
                        padding="dense"
                        className={classes.nowrap}
                        numeric
                      >
                        <TableSortLabel
                          active={playersSortProp === 'trophies'}
                          direction={playersSortDir}
                          onClick={() => sortPlayers('trophies')}
                        >
                          Trophies
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        padding="dense"
                        className={classes.nowrap}
                        numeric
                      >
                        <TableSortLabel
                          active={playersSortProp === 'expLevel'}
                          direction={playersSortDir}
                          onClick={() => sortPlayers('expLevel')}
                        >
                          Level
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        padding="dense"
                        className={classes.nowrap}
                        numeric
                      >
                        <TableSortLabel
                          active={playersSortProp === 'warDayWins'}
                          direction={playersSortDir}
                          onClick={() => sortPlayers('warDayWins')}
                        >
                          War Wins
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        padding="dense"
                        className={classes.nowrap}
                        numeric
                      >
                        <TableSortLabel
                          active={playersSortProp === 'battleCount'}
                          direction={playersSortDir}
                          onClick={() => sortPlayers('battleCount')}
                        >
                          Battles
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        padding="dense"
                        className={classes.nowrap}
                        numeric
                      >
                        <TableSortLabel
                          active={playersSortProp === 'wins'}
                          direction={playersSortDir}
                          onClick={() => sortPlayers('wins')}
                        >
                          Wins
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        padding="dense"
                        className={classes.nowrap}
                        numeric
                      >
                        <TableSortLabel
                          active={playersSortProp === 'losses'}
                          direction={playersSortDir}
                          onClick={() => sortPlayers('losses')}
                        >
                          Losses
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        padding="dense"
                        className={classes.nowrap}
                        numeric
                      >
                        <TableSortLabel
                          active={playersSortProp === 'winRatio'}
                          direction={playersSortDir}
                          onClick={() => sortPlayers('winRatio')}
                        >
                          W/L Ratio
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        padding="dense"
                        className={classes.nowrap}
                        numeric
                      >
                        <TableSortLabel
                          active={playersSortProp === 'winLossDiffNum'}
                          direction={playersSortDir}
                          onClick={() => sortPlayers('winLossDiffNum')}
                        >
                          W/L Diff
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        padding="dense"
                        className={classes.nowrap}
                        numeric
                      >
                        <TableSortLabel
                          active={playersSortProp === 'threeCrownWins'}
                          direction={playersSortDir}
                          onClick={() => sortPlayers('threeCrownWins')}
                        >
                          Three Crowns
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        padding="dense"
                        className={classes.nowrap}
                        numeric
                      >
                        <TableSortLabel
                          active={playersSortProp === 'challengeMaxWins'}
                          direction={playersSortDir}
                          onClick={() => sortPlayers('challengeMaxWins')}
                        >
                          Challenge Max Wins
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        padding="dense"
                        className={classes.nowrap}
                        numeric
                      >
                        <TableSortLabel
                          active={playersSortProp === 'totalDonations'}
                          direction={playersSortDir}
                          onClick={() => sortPlayers('totalDonations')}
                        >
                          Donations
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        padding="dense"
                        className={classes.nowrap}
                        numeric
                      >
                        <TableSortLabel
                          active={playersSortProp === 'clanCardsCollected'}
                          direction={playersSortDir}
                          onClick={() => sortPlayers('clanCardsCollected')}
                        >
                          Clan Cards Collected
                        </TableSortLabel>
                      </TableCell>
                      <TableCell padding="dense">Updated</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list.map((player, i) => (
                      <TableRow key={player.tag}>
                        <TableCell
                          padding="dense"
                          className={classes.nowrap}
                          component="th"
                          scope="row"
                        >
                          {i + 1}. {player.name}
                        </TableCell>
                        <TableCell padding="dense" numeric>
                          {player.trophiesFormatted}
                        </TableCell>
                        <TableCell padding="dense" numeric>
                          {player.expLevel}
                        </TableCell>
                        <TableCell padding="dense" numeric>
                          {player.warDayWins}
                        </TableCell>
                        <TableCell padding="dense" numeric>
                          {player.battlesFormatted}
                        </TableCell>
                        <TableCell padding="dense" numeric>
                          {player.winsFormatted}
                        </TableCell>
                        <TableCell padding="dense" numeric>
                          {player.lossesFormatted}
                        </TableCell>
                        <TableCell padding="dense" numeric>
                          {player.winRatio}
                        </TableCell>
                        <TableCell padding="dense" numeric>
                          {player.winLossDiff.cata({
                            Positive: diff => (
                              <span className={classes.green}>+{diff}</span>
                            ),
                            Negative: diff => (
                              <span className={classes.red}>-{diff}</span>
                            ),
                            Neutral: diff => <span>{diff}</span>
                          })}
                        </TableCell>
                        <TableCell padding="dense" numeric>
                          {player.threeCrownWinsFormatted}
                        </TableCell>
                        <TableCell padding="dense" numeric>
                          {player.challengeMaxWins}
                        </TableCell>
                        <TableCell padding="dense" numeric>
                          {player.totalDonationsFormatted}
                        </TableCell>
                        <TableCell padding="dense" numeric>
                          {player.clanCardsCollectedFormatted}
                        </TableCell>
                        <TableCell padding="dense" className={classes.nowrap}>
                          {player.lastUpdateFormatted}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Fade>
      ),
      Error: msg => <ErrorCard msg={msg} />,
      Loading: () => <LinearProgress />
    })
  }
}

const HomeStyled = withStyles(styles)(HomeUnstyled)

export const Home = connect(
  state => state,
  { getPlayers, sortPlayers }
)(HomeStyled)
