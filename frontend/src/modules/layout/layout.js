import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { BottomNav } from './bottomNav'

const styles = theme => ({
  main: {
    height: '100%',
    display: 'flex',
    'flex-direction': 'column'
  },
  content: {
    flex: 1,
    marginBottom: '75px'
  }
})

const Navbar = () => (
  <AppBar color="primary" position="sticky">
    <Toolbar>
      <Typography variant="title" color="inherit">
        <span role="img" aria-label="trophy emoji">
          🏆
        </span>{' '}
        Day One Crew
      </Typography>
    </Toolbar>
  </AppBar>
)

const LayoutUnstyled = ({ children, classes }) => (
  <div className={classes.main}>
    <Navbar />
    <div className={classes.content}>{children}</div>
    <BottomNav />
  </div>
)

export const Layout = withStyles(styles)(LayoutUnstyled)
