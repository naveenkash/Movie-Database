import React, { Component } from "react";
import "./side_navbar.css";
import { connect } from "react-redux";
import {
  all_Movies,
  account_Details,
  checkAuth,
  movie_type
} from "../../actions";

export class side_navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { showAccount: true, showCat: true, auth: this.props.auth };

    this.h = true;
  }

  componentDidMount() {
    this.props.checkAuth();
  }

  getDeatil = (e, value) => {
    var side_li = document.querySelectorAll(".side_link");
    for (let i = 0; i < side_li.length; i++) {
      const element = side_li[i];
      element.style.color = "rgb(187, 187, 187)";
    }
    // document.querySelectorAll('li').style.color="rgb(187, 187, 187)"
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
  hideAcc = e => {
    e.preventDefault();

    // document.getElementById('acc').style.height="0px";
    this.setState({ showAccount: !this.state.showAccount });
  };
  hideCategory = e => {
    e.preventDefault();

    this.setState({ showCat: !this.state.showCat });
  };

  render() {
    return (
      <div className="side_navbar">
        <div className="side_navbar_wrapper">
          <div className="side_logo">
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
                      onClick={e => {
                        this.getDeatil(e, "popular");
                      }}
                    >
                      Popular
                    </li>
                    <li
                      className="side_link"
                      onClick={e => {
                        this.getDeatil(e, "top_rated");
                      }}
                    >
                      Top Rated
                    </li>
                    <li
                      className="side_link"
                      onClick={e => {
                        this.getDeatil(e, "now_playing");
                      }}
                    >
                      Now Playing
                    </li>
                    <li
                      className="side_link"
                      onClick={e => {
                        this.getDeatil(e, "upcoming");
                      }}
                    >
                      Upcoming
                    </li>
                    {/* <li onClick={this.latestMovies}>Latest</li> */}
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
                        onClick={e => {
                          this.getAccountDetail(e, "watchlist", "movies");
                        }}
                      >
                        Watchlist
                      </li>
                      <li
                        className="side_link"
                        onClick={e => {
                          this.getAccountDetail(e, "favorite", "movies");
                        }}
                      >
                        Favorite
                      </li>
                      {/* <li className="side_link" onClick={(e)=>{this.getAccountDetail(e,'rated','movies')}}>Rated</li> */}
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { all_Movies, account_Details, checkAuth, movie_type }
)(side_navbar);
