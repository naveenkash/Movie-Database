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
    }
    if (this.props.userMovieType !== "favorite") {
      this.props.getUserFavMovies();
      this.props.movie_type("favorite", "userMovie");
    }
  }
  render() {
    const fav_Movies = this.props.movies || [];
    return <MainLayout movies={fav_Movies} pages={this.props.pages} />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  movies: state.movies.fav_movies,
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
