import React from "react";
import GlobalState from "./context/GlobalState";
import { IntlProviderWrapper } from "./context/IntlContext";
import AppRouter from "./AppRouter";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1b1f3a"
    },
    secondary: {
      main: "#ff7844"
    }
  },
  status: {
    danger: "orange"
  }
});
const App = () => (
  <GlobalState>
    <MuiThemeProvider theme={theme}>
      <IntlProviderWrapper>
        <AppRouter />
      </IntlProviderWrapper>
    </MuiThemeProvider>
  </GlobalState>
);

export default App;
