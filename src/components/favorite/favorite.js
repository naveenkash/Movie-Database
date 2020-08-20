import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserFavMovies, isLoggedIn, movie_type } from "../../actions";
import MainLayout from "../layout/main";
export class Favorite extends Component {
  componentDidMount() {
    this.props.isLoggedIn();
    if (!this.props.auth) {
      this.props.history.push("/");
      return;
    }
    this.props.getUserFavMovies();
    this.props.movie_type("favorite");
  }
  render() {
    const fav_Movies = this.props.movies || [];
    return <MainLayout movies={fav_Movies} pages={this.props.pages} />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  movies: state.movies.movies,
  pages: state.movies.total_pages,
  userMovieType: state.movies.userMovieType,
});

export default withRouter(
  connect(mapStateToProps, {
    getUserFavMovies,
    isLoggedIn,
    movie_type,
  })(Favorite)
);
