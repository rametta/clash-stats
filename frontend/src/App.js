import React, { Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import amber from '@material-ui/core/colors/amber'
import indigo from '@material-ui/core/colors/indigo'

import { Home } from './modules/home/home'
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
        <Home />
      </Layout>
    </MuiThemeProvider>
  </Fragment>
)
