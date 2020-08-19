import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import Movies from "./components/movies/movies";
import MovieDetail from "./components/movies/movie_detail";
import { connect } from "react-redux";
import { isLoggedIn } from "../src/actions";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
    };
    this.props.isLoggedIn();
  }

  showDetail = (showMovieDetail) => {
    this.setState({ showDetail: showMovieDetail });
  };
  setMovie = (movie) => {
    this.setState({ movie: movie });
  };
  close = (closeDetail) => {
    this.setState({ showDetail: closeDetail });
  };
  render() {
    return (
      <div className="App">
        <Header />
        <Movies detail={this.showDetail} movie={this.setMovie} />
        {(() => {
          if (!this.state.showDetail) {
            return null;
          } else {
            return (
              <MovieDetail closeDetail={this.close} movie={this.state.movie} />
            );
          }
        })()}
      </div>
    );
  }
}

export default connect(null, { isLoggedIn })(App);
