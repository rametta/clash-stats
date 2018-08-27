import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Fade from '@material-ui/core/Fade'

import { getWar } from '../../thunks'
import { ErrorCard } from '../reusable/errorCard'
import { WarCard } from '../reusable/warCard'

const styles = {
  root: {
    margin: '1em'
  },
  tablePaper: {
    overflowX: 'auto'
  },
  tablePaperPlayers: {
    overflowX: 'auto',
    marginTop: '1em'
  },
  nowrap: {
    whiteSpace: 'nowrap'
  },
  green: {
    color: '#2ee82e'
  },
  red: {
    color: '#e82e2e'
  }
}

class WarUnstyled extends Component {
  componentDidMount() {
    this.props.getWar(this.props.match.params.date)
  }

  render() {
    const { classes, war } = this.props

    return war.cata({
      List: w => (
        <Fade in={true}>
          <div className={classes.root}>
            <Grid container justify="center">
              <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
                <WarCard war={w} />

                <Paper elevation={8} className={classes.tablePaper}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.nowrap}>Clan</TableCell>
                        <TableCell className={classes.nowrap} numeric>
                          Wins
                        </TableCell>
                        <TableCell className={classes.nowrap} numeric>
                          Battles
                        </TableCell>
                        <TableCell className={classes.nowrap} numeric>
                          Crowns
                        </TableCell>
                        <TableCell className={classes.nowrap} numeric>
                          Trophies
                        </TableCell>
                        <TableCell className={classes.nowrap} numeric>
                          Score
                        </TableCell>
                        <TableCell className={classes.nowrap}>Tag</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {w.standings.map(standing => (
                        <TableRow
                          selected={standing.selected}
                          key={standing._id}
                        >
                          <TableCell
                            className={classes.nowrap}
                            component="th"
                            scope="row"
                          >
                            {standing.clan.name}
                          </TableCell>
                          <TableCell numeric>{standing.clan.wins}</TableCell>
                          <TableCell numeric>
                            {standing.clan.battlesPlayed}
                          </TableCell>
                          <TableCell numeric>{standing.clan.crowns}</TableCell>
                          <TableCell numeric>
                            {standing.trophyChange.cata({
                              Positive: diff => (
                                <span className={classes.green}>+{diff}</span>
                              ),
                              Negative: diff => (
                                <span className={classes.red}>{diff}</span>
                              ),
                              Neutral: diff => <span>{diff}</span>
                            })}
                          </TableCell>
                          <TableCell numeric>
                            {standing.clan.clanScore}
                          </TableCell>
                          <TableCell>{standing.clan.tag}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>

                <Paper elevation={8} className={classes.tablePaperPlayers}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.nowrap}>
                          Participant
                        </TableCell>
                        <TableCell className={classes.nowrap} numeric>
                          Battles
                        </TableCell>
                        <TableCell className={classes.nowrap} numeric>
                          Cards Earned
                        </TableCell>
                        <TableCell className={classes.nowrap}>Tag</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {w.participants.map(player => (
                        <TableRow key={player._id}>
                          <TableCell
                            className={classes.nowrap}
                            component="th"
                            scope="row"
                          >
                            {player.medal.cata({
                              Zero: () => (
                                <span role="img" aria-label="cross emoji">
                                  ❌
                                </span>
                              ),
                              One: () => (
                                <span role="img" aria-label="medal emoji">
                                  🎖
                                </span>
                              ),
                              Two: () => (
                                <span role="img" aria-label="2 medal emoji">
                                  🎖🎖
                                </span>
                              )
                            })}{' '}
                            {player.name}
                          </TableCell>
                          <TableCell numeric>{player.battlesPlayed}</TableCell>
                          <TableCell numeric>{player.cardsEarned}</TableCell>
                          <TableCell> {player.tag}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Fade>
      ),
      Loading: () => <LinearProgress />,
      Error: msg => <ErrorCard msg={msg} />
    })
  }
}

const WarStyled = withRouter(withStyles(styles)(WarUnstyled))

export const War = connect(
  state => state,
  { getWar }
)(WarStyled)
