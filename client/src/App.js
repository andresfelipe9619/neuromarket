import React from "react";
import GlobalState from "./context/GlobalState";
import AppRouter from "./AppRouter";
import { createMuiTheme } from "@material-ui/core/styles";
import Palette from "./theme/palette";
import { Chart } from "react-chartjs-2";
import { ThemeProvider } from "@material-ui/styles";
import { chartjs } from "./helpers";
import typography from "./theme/typography";
import overrides from "./theme/overrides";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";

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
      <AppRouter />
    </ThemeProvider>
  </GlobalState>
);

export default App;
