import jwt from "jsonwebtoken";
var API_KEY = process.env.REACT_APP_API_KEY;
var JWT_ACCESS_TOKEN_SECERET = process.env.REACT_APP_JWT_ACCESS_TOKEN_SECERET;
export const addMovies = (movie, page_number) => {
  return (dispatch) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie}?api_key=${API_KEY}&language=en-US&page=${page_number}`
    )
      .then((res) => res.json())
      .then((movies) => {
        dispatch({
          type: "ADD_MOVIES",
          payload: movies,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
};
export const movie_type = (type) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_TYPE",
      payload: type,
    });
  };
};
export const isLoggedIn = () => {
  return (dispatch) => {
    var token = localStorage.getItem("token");
    if (token) {
      jwt.verify(token, JWT_ACCESS_TOKEN_SECERET, (err, decodedToken) => {
        if (err) {
          localStorage.removeItem("token");
          dispatch({
            type: "IS_LOGGED_IN",
            payload: false,
          });
          return;
        }
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          dispatch({
            type: "IS_LOGGED_IN",
            payload: false,
          });
          return;
        } else {
          dispatch({
            type: "IS_LOGGED_IN",
            payload: true,
          });
        }
      });
    } else {
      dispatch({
        type: "IS_LOGGED_IN",
        payload: false,
      });
    }
  };
};
export const sliderMovies = () => {
  return (dispatch) => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((movies) => {
        dispatch({
          type: "ADD_MOVIES_TO_SLIDER",
          payload: movies.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getUserMovies = (type) => {
  return (dispatch) => {
    fetch(`http://localhost:8080/user/movies?type=${type}`, {
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          alert(data.err);
          return;
        }
        if (data.results.length <= 0) {
          return;
        }
        dispatch({
          type: "ADD_ACCOUNT_DETAIL",
          payload: data,
        });
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };
};
export const getVideoUrl = (movies) => (dispatch) => {
  if (movies.length <= 0) {
    return;
  }
  movies.map((movie) => movie.id);
  for (let i = 0; i < movies.length; i++) {
    const element = movies[i];
    fetch(
      `https://api.themoviedb.org/3/movie/${element.id}/videos?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => {
        return res.json();
      })
      .then((video) => {
        dispatch({
          type: "ADD_VIDEOS_URL",
          videoPayload: video,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const genreIds = () => (dispatch) => {
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
  )
    .then((res) => res.json())
    .then((genreIds) =>
      dispatch({
        type: "ADD_GENRES",
        payload: genreIds.genres,
      })
    );
};
