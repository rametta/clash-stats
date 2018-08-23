import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'
import { getPlayers } from './../../thunks'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
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
})

class HomeUnstyled extends Component {
  componentDidMount() {
    this.props.getPlayers()
  }

  render() {
    const { classes, players } = this.props
    return players.cata({
      List: list => (
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={10} lg={10} xl={8}>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell className={classes.nowrap} numeric>
                      Level
                    </TableCell>
                    <TableCell className={classes.nowrap} numeric>
                      War Wins
                    </TableCell>
                    <TableCell className={classes.nowrap} numeric>
                      Trophies
                    </TableCell>
                    <TableCell className={classes.nowrap} numeric>
                      Battles
                    </TableCell>
                    <TableCell className={classes.nowrap} numeric>
                      Wins
                    </TableCell>
                    <TableCell className={classes.nowrap} numeric>
                      Losses
                    </TableCell>
                    <TableCell className={classes.nowrap} numeric>
                      W/L Ratio
                    </TableCell>
                    <TableCell className={classes.nowrap} numeric>
                      W/L Diff
                    </TableCell>
                    <TableCell className={classes.nowrap} numeric>
                      Three Crowns
                    </TableCell>
                    <TableCell className={classes.nowrap} numeric>
                      Challenge Max Wins
                    </TableCell>
                    <TableCell className={classes.nowrap} numeric>
                      Donations
                    </TableCell>
                    <TableCell className={classes.nowrap} numeric>
                      Clan Cards Collected
                    </TableCell>
                    <TableCell>Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map(player => (
                    <TableRow key={player.tag}>
                      <TableCell component="th" scope="row">
                        {player.name}
                      </TableCell>
                      <TableCell numeric>{player.expLevel}</TableCell>
                      <TableCell numeric>{player.warDayWins}</TableCell>
                      <TableCell numeric>{player.trophies}</TableCell>
                      <TableCell numeric>{player.battleCount}</TableCell>
                      <TableCell numeric>{player.wins}</TableCell>
                      <TableCell numeric>{player.losses}</TableCell>
                      <TableCell numeric>{player.winRatio}</TableCell>
                      <TableCell numeric>
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
                      <TableCell numeric>{player.threeCrownWins}</TableCell>
                      <TableCell numeric>{player.challengeMaxWins}</TableCell>
                      <TableCell numeric>
                        {player.totalDonationsFormatted}
                      </TableCell>
                      <TableCell numeric>
                        {player.clanCardsCollectedFormatted}
                      </TableCell>
                      <TableCell className={classes.nowrap}>
                        {player.lastUpdate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      ),
      Error: msg => <code>{msg}</code>,
      Loading: () => <LinearProgress />
    })
  }
}

const HomeStyled = withStyles(styles)(HomeUnstyled)

export const Home = connect(
  state => state,
  { getPlayers }
)(HomeStyled)
