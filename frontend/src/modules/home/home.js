import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const data = [
  {
    user: 'NatureValley',
    level: 11,
    warDayWins: 2345,
    trophies: 234235,
    battles: 34534,
    wins: 124534,
    losses: 435435,
    ratio: 3.234,
    threeCrowns: 345,
    challenges: 345345,
    donations: 98745,
    clanCardsCollected: 345345
  },
  {
    user: 'VeeMerk',
    level: 11,
    warDayWins: 2345,
    trophies: 234235,
    battles: 34534,
    wins: 124534,
    losses: 435435,
    ratio: 3.234,
    threeCrowns: 345,
    challenges: 345345,
    donations: 98745,
    clanCardsCollected: 345345
  },
  {
    user: 'EhLouis',
    level: 11,
    warDayWins: 2345,
    trophies: 234235,
    battles: 34534,
    wins: 124534,
    losses: 435435,
    ratio: 3.234,
    threeCrowns: 345,
    challenges: 345345,
    donations: 98745,
    clanCardsCollected: 345345
  },
  {
    user: 'Cryonical',
    level: 11,
    warDayWins: 2345,
    trophies: 234235,
    battles: 34534,
    wins: 124534,
    losses: 435435,
    ratio: 3.234,
    threeCrowns: 345,
    challenges: 345345,
    donations: 98745,
    clanCardsCollected: 345345
  }
]

const styles = theme => ({
  root: {
    // width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
})

const HomeUnstyled = ({ classes }) => (
  <Grid container justify="center">
    <Grid item xs={12} sm={12} md={10} lg={10} xl={8}>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell numeric>Level</TableCell>
              <TableCell numeric>War Day Wins</TableCell>
              <TableCell numeric>Trophies</TableCell>
              <TableCell numeric>Battles</TableCell>
              <TableCell numeric>Wins</TableCell>
              <TableCell numeric>Losses</TableCell>
              <TableCell numeric>Ratio</TableCell>
              <TableCell numeric>Three Crowns</TableCell>
              <TableCell numeric>Challenges</TableCell>
              <TableCell numeric>Donations</TableCell>
              <TableCell numeric>Clan Cards Collected</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(d => (
              <TableRow key={d.user}>
                <TableCell component="th" scope="row">
                  {d.user}
                </TableCell>
                <TableCell numeric>{d.level}</TableCell>
                <TableCell numeric>{d.warDayWins}</TableCell>
                <TableCell numeric>{d.trophies}</TableCell>
                <TableCell numeric>{d.battles}</TableCell>
                <TableCell numeric>{d.wins}</TableCell>
                <TableCell numeric>{d.losses}</TableCell>
                <TableCell numeric>{d.ratio}</TableCell>
                <TableCell numeric>{d.threeCrowns}</TableCell>
                <TableCell numeric>{d.challenges}</TableCell>
                <TableCell numeric>{d.donations}</TableCell>
                <TableCell numeric>{d.clanCardsCollected}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  </Grid>
)

export const Home = withStyles(styles)(HomeUnstyled)
