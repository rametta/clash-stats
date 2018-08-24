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
import Chip from '@material-ui/core/Chip'
import LinearProgress from '@material-ui/core/LinearProgress'
import { getClan } from './../../thunks'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '1em'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  nowrap: {
    whiteSpace: 'nowrap'
  },
  table: {
    minWidth: 700
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  chip: {
    textTransform: 'uppercase',
    fontSize: 10,
    marginRight: '1em'
  },
  role: {
    textTransform: 'uppercase'
  },
  topPart: {
    display: 'flex',
    alignItems: 'center'
  }
})

class ClanUnstyled extends Component {
  componentDidMount() {
    this.props.getClan()
  }

  render() {
    const { classes, clan } = this.props
    console.log(clan)

    return clan.cata({
      List: clan => (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <div className={classes.topPart}>
                <Chip
                  color="secondary"
                  label={clan.type}
                  className={classes.chip}
                />
                <Typography variant="title">{clan.tag}</Typography>
              </div>

              <Typography>{clan.location.name}</Typography>
              <Typography>
                {clan.donationsPerWeek} donations per week
              </Typography>
              <Paper className={classes.paper}>xs=12</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.tableWrapper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Members ({clan.members})</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell className={classes.nowrap} numeric>
                        Level
                      </TableCell>
                      <TableCell className={classes.nowrap} numeric>
                        Donations
                      </TableCell>
                      <TableCell className={classes.nowrap} numeric>
                        Donations Received
                      </TableCell>
                      <TableCell className={classes.nowrap} numeric>
                        Trophies
                      </TableCell>
                      <TableCell className={classes.nowrap} numeric>
                        Arena
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clan.memberList.map(member => (
                      <TableRow key={member.tag}>
                        <TableCell component="th" scope="row">
                          {member.name}
                        </TableCell>
                        <TableCell>
                          <small className={classes.role}>{member.role}</small>
                        </TableCell>
                        <TableCell numeric>{member.expLevel}</TableCell>
                        <TableCell numeric>{member.donations}</TableCell>
                        <TableCell numeric>
                          {member.donationsReceived}
                        </TableCell>
                        <TableCell numeric>{member.trophies}</TableCell>
                        <TableCell numeric className={classes.nowrap}>
                          {member.arena.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
              <Typography color="textSecondary">{clan.lastUpdate}</Typography>
            </Grid>
          </Grid>
        </div>
      ),
      Error: err => <code>{err}</code>,
      Loading: () => <LinearProgress />
    })
  }
}

const ClanStyled = withStyles(styles)(ClanUnstyled)

export const Clan = connect(
  state => state,
  { getClan }
)(ClanStyled)
