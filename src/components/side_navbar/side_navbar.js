import React, { Component } from "react";
import "./side_navbar.css";
import "../../animate.css";
import { connect } from "react-redux";
import {
  addMovies,
  getUserMovies,
  isLoggedIn,
  movie_type,
} from "../../actions";

export class side_navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { showAccount: true, showCat: true, auth: this.props.auth };
  }

  getDetail = (e, value) => {
    var side_li = document.querySelectorAll(".side_link");
    for (let i = 0; i < side_li.length; i++) {
      const element = side_li[i];
      element.style.color = "rgb(53, 53, 53)";
    }
    this.props.addMovies(value, 1);
    this.props.movie_type(value);
    e.target.style.color = "black";
  };
  getUserMovies = (e, value, type) => {
    var side_li = document.querySelectorAll(".side_link");
    for (let i = 0; i < side_li.length; i++) {
      const element = side_li[i];
      element.style.color = "rgb(53, 53, 53)";
    }
    this.props.getUserMovies(type);
    e.target.style.color = "black";
  };
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
    return (
      <div className="animated side_navbar fadeInLeft">
        <div className="side_navbar_wrapper">
          <div className="side_logo">
            <div className="close" onClick={this.closeSideNav}>
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
              </h1>
              {(() => {
                if (!this.state.showCat) {
                  return null;
                }
                return (
                  <ul>
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
                );
              })()}

              {(() => {
                if (this.props.auth) {
                  return (
                    <h1 onClick={this.hideAcc} className="side_category_head">
                      Account
                    </h1>
                  );
                }
              })()}

              {(() => {
                if (this.state.showAccount) {
                  return null;
                } else {
                  return (
                    <ul>
                      <li
                        className="side_link"
                        onClick={(e) => {
                          this.getUserMovies(e, "watchlist");
                        }}
                      >
                        <span>Watchlist</span>
                      </li>
                      <li
                        className="side_link"
                        onClick={(e) => {
                          this.getUserMovies(e, "favorite");
                        }}
                      >
                        <span>Favorite</span>
                      </li>
                    </ul>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addMovies,
  getUserMovies,
  isLoggedIn,
  movie_type,
})(side_navbar);
