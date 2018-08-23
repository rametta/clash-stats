import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import amber from '@material-ui/core/colors/amber'
import indigo from '@material-ui/core/colors/indigo'

import { Home } from './modules/home/home'
import { Clan } from './modules/clan/clan'
import { War } from './modules/war/war'
import { Layout } from './modules/layout/layout'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: amber,
    secondary: indigo
  }
})

export const App = () => (
  <Fragment>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/clan" component={Clan} />
          <Route path="/war" component={War} />
        </Switch>
      </Layout>
    </MuiThemeProvider>
  </Fragment>
)
