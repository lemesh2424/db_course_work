import * as React from "react";
import { FC } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./theme";
import Dashboard from "./components/Dashboard";

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="*">
          <Redirect to={"/dashboard"} />
        </Route>
      </Switch>
    </Router>
  );
};

const AppProvider: FC = () => (
  <ThemeProvider theme={theme}>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </ThemeProvider>
);

export default AppProvider;
