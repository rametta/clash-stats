import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  error: {
    margin: '1em'
  },
  pad: {
    paddingBottom: '16px !important'
  }
}

const ErrorCardUnstyled = ({ classes, msg }) => (
  <Card className={classes.error}>
    <CardHeader title="🙈 OOPS" />
    <CardContent className={classes.pad}>
      <Typography component="span">{msg}</Typography>
    </CardContent>
  </Card>
)

export const ErrorCard = withStyles(styles)(ErrorCardUnstyled)
