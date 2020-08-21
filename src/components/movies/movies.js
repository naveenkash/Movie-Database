import React, { Component } from "react";
import { connect } from "react-redux";
import "./movie.css";
import Pagination from "./pagination";
export class movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
    };
  }
  seeDetail = (movie) => {
    var showMovieDetail = true;
    this.props.detail(showMovieDetail);
    this.props.movie(movie);
  };
  convertToReadableDate = (date) => {
    if (!date) {
      return "";
    }
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let spl = date.split("-");
    let m = spl[1] < 10 ? spl[1].split("")[1] : spl[1];
    let d = spl[2] < 10 ? spl[2].split("")[1] : spl[2];
    return `${d} ${months[m]}, ${spl[0]}`;
  };
  addToWatchList = (movie) => {};
  addToFavorite = async (e, movie) => {
    e.persist();
    if (!this.props.auth) {
      alert("Please login or signup to add to favorite");
      return;
    }
    try {
      const res = await fetch(
        "https://immense-coast-18153.herokuapp.com/movie/favorite/update",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.state.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(movie),
        }
      );
      const data = await res.json();
      if (data.err) {
        alert(data.err);
        return;
      }
      if (data.ok) {
        e.target.style.color = "red";
      } else if (data.removed) {
        e.target.style.color = "black";
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <div className="movies">
        <div className="movie_wrapper">
          {(() => {
            if (this.props.movies.length === 0) {
              return "No movie present";
            }
          })()}
          {this.props.movies.map((movie) => (
            <div key={movie.id} className="movie_container">
              <div
                onClick={() => {
                  this.seeDetail(movie);
                }}
                className="movie_poster"
              >
                <img
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt=""
                />
              </div>
              <div className="movie_detail">
                <div className="movie_name">
                  <h4
                    onClick={() => {
                      this.seeDetail(movie);
                    }}
                  >
                    {movie.title}
                  </h4>
                  <p>{this.convertToReadableDate(movie.release_date)}</p>
                </div>
                <div className="movie_rating">
                  <i
                    id="favorite"
                    title="Add To Favorite"
                    onClick={(e) => {
                      this.addToFavorite(e, movie);
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="heart"
                      className="svg-inline--fa fa-heart fa-w-16"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                      ></path>
                    </svg>
                  </i>
                  <div
                    onClick={(e) => {
                      this.addToWatchList(movie);
                    }}
                    className="add_to_waatchlist"
                  >
                    <i id="watchlist" title="Add To Watchlist">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="bookmark"
                        className="svg-inline--fa fa-bookmark fa-w-12"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path
                          fill="currentColor"
                          d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"
                        ></path>
                      </svg>
                    </i>
                  </div>

                  <i id="rating" title="Rating">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="star"
                      className="svg-inline--fa fa-star fa-w-18"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                      ></path>
                    </svg>
                  </i>
                  <h4>{movie.vote_average}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        {(() => {
          if (!this.props.pages || this.props.pages <= 1) {
            return null;
          } else {
            return <Pagination />;
          }
        })()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(movies);
