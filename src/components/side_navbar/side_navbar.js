import React, { Component } from "react";
import "./side_navbar.css";
import { connect } from "react-redux";
import { all_Movies, account_Details, checkAuth } from "../../actions";
import store from "../../store";

export class side_navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { showAccount: true, showCat: true, auth: this.props.auth };
     store.subscribe(() => {
      if (store.getState().auth) {
        this.setState({ auth: this.props.auth });
      }
    });
   ;
  }

  componentDidMount() {
    this.props.checkAuth()
    // if (localStorage.getItem("session_id")) {
    //   this.setState({ auth: true });
    // } else {
    //   this.setState({ auth: false });
    // } 
   
  }

  popularMovies = () => {
    this.props.all_Movies(() => {}, "popular");
  };
  topRatedMovies = () => {
    this.props.all_Movies(() => {}, "top_rated");
  };

  nowPlayingMovies = () => {
    this.props.all_Movies(() => {}, "now_playing");
  };
  upcomingMovies = () => {
    this.props.all_Movies(() => {}, "upcoming");
  };

  getWatchList = () => {
    var session_id = localStorage.getItem("session_id");
    this.props.account_Details("watchlist", "movies", session_id);
  };
  getFavorite = () => {
    var session_id = localStorage.getItem("session_id");
    this.props.account_Details("favorite", "movies", session_id);
  };
  getRated = () => {
    var session_id = localStorage.getItem("session_id");
    this.props.account_Details("rated", "movies", session_id);
  };
  hideAcc = e => {
    e.preventDefault();

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
                    <li onClick={this.popularMovies}>Popular</li>
                    <li onClick={this.topRatedMovies}>Top Rated</li>
                    <li onClick={this.nowPlayingMovies}>Now Playing</li>
                    <li onClick={this.upcomingMovies}>Upcoming</li>
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
                      <li onClick={this.getWatchList}>Watchlist</li>
                      <li onClick={this.getFavorite}>Favorite</li>
                      <li onClick={this.getRated}>Rated</li>
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
    auth: state.auth,

  });

export default connect(
    mapStateToProps,
  { all_Movies, account_Details, checkAuth }
)(side_navbar);
