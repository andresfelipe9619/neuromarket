import React from "react";
import GlobalState from "./context/GlobalState";
import AppRouter from "./AppRouter";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { purple, green } from "@material-ui/core/colors";
const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  status: {
    danger: "orange"
  }
});
const App = () => (
  <GlobalState>
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  </GlobalState>
);

export default App;
