import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Fade from '@material-ui/core/Fade'

import { getWarlog } from '../../thunks'
import { ErrorCard } from '../reusable/errorCard'
import { WarCard } from '../reusable/warCard'

const styles = {
  root: {
    margin: '1em'
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
        <Fade in={true}>
          <div className={classes.root}>
            <Grid container justify="center">
              <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
                {warlogs.map(war => (
                  <WarCard key={war.createdDate} war={war} />
                ))}
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

const WarStyled = withStyles(styles)(WarUnstyled)

export const Warlog = connect(
  state => state,
  { getWarlog }
)(WarStyled)
