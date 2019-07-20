import React from "react";
import GlobalState from "./context/GlobalState";
import AppRouter from "./AppRouter";
import { Router } from 'react-router-dom';
import { createMuiTheme } from "@material-ui/core/styles";
import Palette from "./theme/palette";

import { createBrowserHistory } from 'history';

// Externals
import { Chart } from 'react-chartjs-2';

// Material helpers
import { ThemeProvider } from '@material-ui/styles';

// ChartJS helpers
import { chartjs } from './helpers';

// Theme
import typography from './theme/typography';
import overrides from './theme/overrides';

// Styles
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

// Browser history
const browserHistory = createBrowserHistory();

// Configure ChartJS
Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

const theme = createMuiTheme({
  palette: Palette,
  typography,
  overrides
});
const App = () => (
  <GlobalState>
    <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <AppRouter />
        </Router>
      </ThemeProvider>
  </GlobalState>
);

export default App;
