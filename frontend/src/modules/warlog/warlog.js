import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { getWarlog } from '../../thunks'

const styles = {
  root: {
    margin: '1em'
  },
  warCard: {
    marginBottom: '1em'
  },
  green: {
    color: '#2ee82e'
  },
  red: {
    color: '#e82e2e'
  },
  grey: {
    color: 'rgba(255, 255, 255, 0.7)'
  },
  topPart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  middlePart: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px'
  },
  bottomPart: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px'
  },
  trophy: {
    marginLeft: '5px'
  },
  small: {
    fontSize: '12px'
  }
}

class WarUnstyled extends Component {
  componentDidMount() {
    this.props.getWarlog()
  }

  render() {
    const { classes, warlog } = this.props

    return warlog.cata({
      List: warlogs => (
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid item xs={12} sm={12} md={10} lg={10} xl={8}>
              {warlogs.map(war => (
                <Card key={war.createdDate} className={classes.warCard}>
                  <CardContent>
                    <div className={classes.topPart}>
                      <Typography variant="title" color="textSecondary">
                        {war.createdDateFormatted}
                      </Typography>
                      <Typography>
                        {war.trophyChange.cata({
                          Positive: diff => (
                            <span className={classes.green}>+{diff}</span>
                          ),
                          Negative: diff => (
                            <span className={classes.red}>{diff}</span>
                          ),
                          Neutral: diff => <span>{diff}</span>
                        })}
                        <span
                          role="img"
                          aria-label="trophy"
                          className={classes.trophy}
                        >
                          🏆
                        </span>
                      </Typography>
                    </div>
                    <div className={classes.middlePart}>
                      <Typography component="span">
                        {war.crew.clan.battlesPlayed}{' '}
                        <span className={classes.grey}>Battles</span>
                      </Typography>
                      <Typography>
                        {war.crew.clan.wins}{' '}
                        <span className={classes.grey}>Wins</span>
                      </Typography>
                      <Typography>
                        {war.crew.clan.crowns}{' '}
                        <span
                          role="img"
                          aria-label="crown"
                          className={classes.trophy}
                        >
                          👑
                        </span>
                      </Typography>
                    </div>
                    <div className={classes.bottomPart}>
                      <Typography color="textSecondary">
                        {war.crew.clan.participants} Participants
                      </Typography>
                      <Typography>
                        {war.standing.cata({
                          First: standing => (
                            <span>
                              {standing}{' '}
                              <span role="img" aria-label="first medal">
                                🥇
                              </span>
                            </span>
                          ),
                          Second: standing => (
                            <span>
                              {standing}{' '}
                              <span role="img" aria-label="second medal">
                                🥈
                              </span>
                            </span>
                          ),
                          Third: standing => (
                            <span>
                              {standing}{' '}
                              <span role="img" aria-label="third medal">
                                🥉
                              </span>
                            </span>
                          ),
                          Fourth: standing => (
                            <span>
                              {standing}{' '}
                              <span role="img" aria-label="disappointed">
                                😥
                              </span>
                            </span>
                          ),
                          Fifth: standing => (
                            <span>
                              {standing}{' '}
                              <span role="img" aria-label="poop">
                                💩
                              </span>
                            </span>
                          )
                        })}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </div>
      ),
      Loading: () => <LinearProgress />,
      Error: err => <code>{err.toString()}</code>
    })
  }
}

const WarStyled = withStyles(styles)(WarUnstyled)

export const Warlog = connect(
  state => state,
  { getWarlog }
)(WarStyled)
