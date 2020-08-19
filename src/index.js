import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import SignUp from "./components/auth/signup";
import Login from "./components/auth/login";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <App />}></Route>
        <Route path="/signup" render={() => <SignUp />}></Route>
        <Route path="/login" render={() => <Login />}></Route>
        <Route render={() => <Redirect to="/" />}></Route>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
