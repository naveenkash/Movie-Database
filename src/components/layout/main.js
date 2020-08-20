import React, { Component } from "react";
import Movies from "../movies/movies";
import MovieDetail from "../movies/movie_detail";
import { connect } from "react-redux";
export class Movielayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
    };
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
      <>
        <Movies
          detail={this.showDetail}
          pages={this.props.pages}
          movies={this.props.movies}
          movie={this.setMovie}
        />
        {(() => {
          if (!this.state.showDetail) {
            return null;
          } else {
            return (
              <MovieDetail closeDetail={this.close} movie={this.state.movie} />
            );
          }
        })()}
      </>
    );
  }
}
export default connect(null, {})(Movielayout);
