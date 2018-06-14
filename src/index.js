/* eslint react/jsx-filename-extension:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import store from './store';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#14243c',
    },
    secondary: {
      main: '#fd386a',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
