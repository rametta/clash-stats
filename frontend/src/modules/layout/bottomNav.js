import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import InfoIcon from '@material-ui/icons/InfoTwoTone'
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

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Info" icon={<InfoIcon />} />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Clan" icon={<ClanIcon />} />
      </BottomNavigation>
    )
  }
}

export const BottomNav = withStyles(styles)(SimpleBottomNavigation)
