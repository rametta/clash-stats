import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import InfoIcon from '@material-ui/icons/InfoTwoTone'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

import { BottomNav } from './bottomNav'
import { openChangelog, closeChangelog } from './../../redux'

const styles = theme => ({
  main: {
    height: '100%',
    display: 'flex',
    'flex-direction': 'column'
  },
  content: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      padding: '56px 0'
    },
    [theme.breakpoints.up('sm')]: {
      padding: '64px 0 56px 0'
    }
  },
  mainTitle: {
    flexGrow: 1,
    textDecoration: 'none'
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    position: 'relative'
  },
  dialogBody: {
    margin: '1em'
  },
  changelog: {
    marginTop: '1em',
    marginBottom: '1em'
  },
  changelogBlock: {
    marginTop: '1em',
    marginBottom: '1em'
  }
})

const Transition = props => <Slide direction="up" {...props} />

const LayoutUnstyled = ({
  children,
  classes,
  changelog,
  closeChangelog,
  openChangelog
}) => (
  <div className={classes.main}>
    <AppBar color="primary" position="fixed">
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          className={classes.mainTitle}
          variant="title"
          color="inherit"
        >
          <span role="img" aria-label="trophy emoji">
            🏆
          </span>{' '}
          Day One Crew
        </Typography>
        <IconButton aria-label="Info" color="inherit" onClick={openChangelog}>
          <InfoIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Dialog
      fullScreen
      open={changelog.cata({ Opened: () => true, Closed: () => false })}
      onClose={closeChangelog}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.grow}>
            Information
          </Typography>
          <IconButton
            color="inherit"
            onClick={closeChangelog}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.dialogBody}>
        <Typography>
          Made with{' '}
          <span role="img" aria-label="beer emoji">
            🍺
          </span>{' '}
          by Jason
        </Typography>

        <Typography className={classes.changelog} variant="subheading">
          Changelog
        </Typography>

        <div className={classes.changelogBlock}>
          <Typography variant="caption">Aug 28, 2018</Typography>
          <Typography>- Tables now sortable</Typography>
          <Typography>- Page transitions</Typography>
        </div>

        <div className={classes.changelogBlock}>
          <Typography variant="caption">Aug 26, 2018</Typography>
          <Typography>- New single war page</Typography>
        </div>

        <div className={classes.changelogBlock}>
          <Typography variant="caption">Aug 25, 2018</Typography>
          <Typography>- New warlog page</Typography>
        </div>

        <div className={classes.changelogBlock}>
          <Typography variant="caption">Aug 24, 2018</Typography>
          <Typography>- New information popover</Typography>
          <Typography>- New home page</Typography>
          <Typography>- New clan page</Typography>
        </div>
      </div>
    </Dialog>
    <div className={classes.content}>{children}</div>
    <BottomNav />
  </div>
)

const LayoutStyled = withStyles(styles)(LayoutUnstyled)

export const Layout = connect(
  state => state,
  { openChangelog, closeChangelog }
)(LayoutStyled)
