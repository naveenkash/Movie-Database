export const addPopularMovies = (callback) => {
  return dispatch => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=25050db00f2ae7ba0e6b1631fc0d272f&language=en-US&page=1"
    )
      .then(res => res.json())
      .then(movies => {
        dispatch({
          type: "ADD_POPULAR_MOVIES",
          payload: movies.results
        });
        callback();
      })
      .catch((err)=>{
        console.log(err);
        callback();
      })
  };
};

export const getVideoUrl = movies => dispatch => {
  if (movies.length <= 0) {
    return;
  }
  movies.map(movie => movie.id);
  for (let i = 0; i < movies.length; i++) {
    const element = movies[i];
    fetch(
      `https://api.themoviedb.org/3/movie/${element.id}/videos?api_key=25050db00f2ae7ba0e6b1631fc0d272f&language=en-US`
    )
      .then(res => {
        return res.json();
      })
      .then(video => {
        dispatch({
          type: "ADD_POPULAR_VIDEOS",
          videoPayload: video
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const genresIds = () => dispatch => {

  fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=25050db00f2ae7ba0e6b1631fc0d272f&language=en-US"
  )
    .then(res => res.json())
    .then(genreIds =>
      dispatch({
        type: "ADD_GENRES",
        payload: genreIds.genres
      })
    );
};
export const addSessionId = (token) => dispatch => {
  dispatch({
    type: "ADD_TOKEN",
    payload: token
  })

};
