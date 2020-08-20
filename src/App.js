import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { isLoggedIn, addMovies, movie_type } from "../src/actions";
import MainLayout from "./components/layout/main";
import SignUp from "./components/auth/signup";
import Login from "./components/auth/login";
import Favorite from "./components/favorite/favorite";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/layout/navbar";
export class App extends Component {
  constructor(props) {
    super(props);
    this.props.isLoggedIn();
    this.props.addMovies("popular", 1);
    this.props.movie_type("popular");
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MainLayout movies={this.props.movies} pages={this.props.pages} />
            )}
          ></Route>
          <Route path="/signup" render={() => <SignUp />}></Route>
          <Route path="/login" render={() => <Login />}></Route>
          <Route path="/favorite" render={() => <Favorite />}></Route>
          <Route render={() => <Redirect to="/" />}></Route>
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  pages: state.movies.total_pages,
});
export default connect(mapStateToProps, { isLoggedIn, addMovies, movie_type })(
  App
);
