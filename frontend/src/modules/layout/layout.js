import React from 'react'
import { connect } from 'react-redux'
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

const styles = {
  main: {
    height: '100%',
    display: 'flex',
    'flex-direction': 'column'
  },
  content: {
    flex: 1,
    marginBottom: '75px'
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
}

const Transition = props => <Slide direction="up" {...props} />

const LayoutUnstyled = ({
  children,
  classes,
  changelog,
  closeChangelog,
  openChangelog
}) =>
  console.log(changelog) || (
    <div className={classes.main}>
      <AppBar color="primary" position="sticky">
        <Toolbar>
          <Typography className={classes.grow} variant="title" color="inherit">
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
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
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
