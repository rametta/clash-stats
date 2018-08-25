import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    margin: '1em'
  }
}

class WarUnstyled extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={12} sm={12} md={10} lg={10} xl={8}>
            <Typography>War log coming soon...</Typography>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const WarStyled = withStyles(styles)(WarUnstyled)

export const War = connect(state => state)(WarStyled)
