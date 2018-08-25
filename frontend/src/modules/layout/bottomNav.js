import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import GameIcon from '@material-ui/icons/GamesTwoTone'
import HomeIcon from '@material-ui/icons/HomeTwoTone'
import ClanIcon from '@material-ui/icons/CategoryTwoTone'

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0
  }
}

const SimpleBottomNavigation = ({ classes, location: { pathname } }) => (
  <BottomNavigation value={pathname} showLabels className={classes.root}>
    <BottomNavigationAction
      component={Link}
      to="/warlog"
      value="/warlog"
      label="War Log"
      icon={<GameIcon />}
    />
    <BottomNavigationAction
      component={Link}
      to="/"
      value="/"
      label="Home"
      icon={<HomeIcon />}
    />
    <BottomNavigationAction
      component={Link}
      to="/clan"
      value="/clan"
      label="Clan"
      icon={<ClanIcon />}
    />
  </BottomNavigation>
)

export const BottomNav = withRouter(withStyles(styles)(SimpleBottomNavigation))
