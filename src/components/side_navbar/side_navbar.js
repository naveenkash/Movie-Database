import React, { Component } from "react";
import "./side_navbar.css";
import "../../animate.css";
import { connect } from "react-redux";
import { addMovies, movie_type } from "../../actions";
import { withRouter } from "react-router-dom";

export class side_navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { showAccount: false, showCat: true };
    this.initialLoad = true;
  }

  getDetail = (e, value) => {
    this.resetSideLinkColor();
    if (this.props.movieType === value) {
      this.props.history.push("/");
    } else {
      this.props.addMovies(value, 1);
      this.props.movie_type(value);
      this.props.history.push("/");
    }
    e.currentTarget.style.color = "#2176FF";
  };
  getUserFavMovies = (e) => {
    this.resetSideLinkColor();
    this.props.history.push("/favorite");
    e.currentTarget.style.color = "#2176FF";
  };
  resetSideLinkColor = () => {
    var side_li = document.querySelectorAll(".side_link");
    for (let i = 0; i < side_li.length; i++) {
      const element = side_li[i];
      element.style.color = "rgb(53, 53, 53)";
    }
  };
  getUserWatchlistMovies = (e) => {};
  hideAcc = (e) => {
    e.preventDefault();
    this.setState({ showAccount: !this.state.showAccount });
  };
  hideCategory = (e) => {
    e.preventDefault();
    this.setState({ showCat: !this.state.showCat });
  };
  closeSideNav = () => {
    this.props.closeNav();
  };
  render() {
    if (this.props.open) {
      this.initialLoad = false;
    }
    return (
      <div
        className={`animate__animated side_navbar ${
          this.initialLoad
            ? "hideSideBar"
            : this.props.open
            ? "animate__fadeInLeft"
            : "closeSideNavBar"
        }`}
      >
        <div className="side_navbar_wrapper">
          <div className="side_logo">
            <div
              className="close"
              onClick={() => {
                this.closeSideNav();
              }}
            >
              {" "}
              <i>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="times"
                  className="svg-inline--fa fa-times fa-w-11"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 352 512"
                >
                  <path
                    fill="currentColor"
                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                  ></path>
                </svg>
              </i>{" "}
            </div>
            <h1>Menu</h1>
          </div>
          <div className="side_navbar_container">
            <div className="side_category">
              <h1 onClick={this.hideCategory} className="side_category_head">
                Categories
                <span
                  className={`${
                    this.state.showCat ? "rotateArrow" : "rotateArrowBack"
                  }`}
                >
                  <i className="fas fa-angle-up"></i>
                </span>
              </h1>
              <ul
                className={`animate__animated ${
                  this.state.showCat ? "showMenu" : "hideMenu"
                }`}
              >
                <li
                  className="side_link"
                  id="pop"
                  onClick={(e) => {
                    this.getDetail(e, "popular");
                  }}
                >
                  <span>Popular</span>
                </li>
                <li
                  className="side_link"
                  onClick={(e) => {
                    this.getDetail(e, "top_rated");
                  }}
                >
                  <span> Top Rated</span>
                </li>
                <li
                  className="side_link"
                  onClick={(e) => {
                    this.getDetail(e, "now_playing");
                  }}
                >
                  <span>Now Playing</span>
                </li>
                <li
                  className="side_link"
                  onClick={(e) => {
                    this.getDetail(e, "upcoming");
                  }}
                >
                  <span>Upcoming</span>
                </li>
              </ul>
              {(() => {
                if (this.props.auth) {
                  return (
                    <h1
                      id="acc"
                      onClick={this.hideAcc}
                      className="side_category_head"
                    >
                      Account
                      <span
                        className={`${
                          this.state.showAccount ? "rotateArrow" : "rotateArrowBack"
                        }`}
                      >
                        <i className="fas fa-angle-up"></i>
                      </span>
                    </h1>
                  );
                }
              })()}
              <ul
                className={`animate__animated ${
                  this.state.showAccount ? "showMenu" : "hideMenu"
                }`}
              >
                <li
                  className="side_link"
                  onClick={(e) => {
                    this.getUserWatchlistMovies(e);
                  }}
                >
                  <span>Watchlist</span>
                </li>
                <li
                  className="side_link"
                  onClick={(e) => {
                    this.getUserFavMovies(e);
                  }}
                >
                  <span>Favorite</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  movieType: state.movies.type,
});

export default withRouter(
  connect(mapStateToProps, {
    addMovies,
    movie_type,
  })(side_navbar)
);
