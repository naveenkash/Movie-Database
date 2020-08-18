import React, { Component } from "react";
import "./side_navbar.css";
import "../../animate.css";
import { connect } from "react-redux";
import {
  all_Movies,
  account_Details,
  checkAuth,
  movie_type,
} from "../../actions";

export class side_navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { showAccount: true, showCat: true, auth: this.props.auth };

    this.h = true;
  }

  getDeatil = (e, value) => {
    var side_li = document.querySelectorAll(".side_link");
    for (let i = 0; i < side_li.length; i++) {
      const element = side_li[i];
      element.style.color = "rgb(187, 187, 187)";
    }
    this.props.all_Movies(value, 1);
    this.props.movie_type(value);
    e.target.style.color = "white";
  };
  getAccountDetail = (e, value, type) => {
    var side_li = document.querySelectorAll(".side_link");
    for (let i = 0; i < side_li.length; i++) {
      const element = side_li[i];
      element.style.color = "rgb(187, 187, 187)";
    }
    var session_id = localStorage.getItem("session_id");
    this.props.account_Details(value, type, session_id);
    e.target.style.color = "white";
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
            <h1> Filmastic</h1>
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
                        this.getDeatil(e, "popular");
                      }}
                    >
                      Popular
                    </li>
                    <li
                      className="side_link"
                      onClick={(e) => {
                        this.getDeatil(e, "top_rated");
                      }}
                    >
                      Top Rated
                    </li>
                    <li
                      className="side_link"
                      onClick={(e) => {
                        this.getDeatil(e, "now_playing");
                      }}
                    >
                      Now Playing
                    </li>
                    <li
                      className="side_link"
                      onClick={(e) => {
                        this.getDeatil(e, "upcoming");
                      }}
                    >
                      Upcoming
                    </li>
                  </ul>
                );
              })()}
              <h1 onClick={this.hideAcc} className="side_category_head">
                Account
              </h1>

              {(() => {
                if (!this.props.auth) {
                  return null;
                } else if (!this.state.showAccount) {
                  return null;
                } else {
                  return (
                    <ul>
                      <li
                        className="side_link"
                        onClick={(e) => {
                          this.getAccountDetail(e, "watchlist", "movies");
                        }}
                      >
                        Watchlist
                      </li>
                      <li
                        className="side_link"
                        onClick={(e) => {
                          this.getAccountDetail(e, "favorite", "movies");
                        }}
                      >
                        Favorite
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
  all_Movies,
  account_Details,
  checkAuth,
  movie_type,
})(side_navbar);
