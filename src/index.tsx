import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { AvailableOrder } from './landing-page';
import theme from './util/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AvailableOrder />
  </ThemeProvider>,
  document.querySelector('#root'),
)
