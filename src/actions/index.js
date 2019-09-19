
export const all_Movies = (movie,page_number) => {
  return dispatch => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie}?api_key=25050db00f2ae7ba0e6b1631fc0d272f&language=en-US&page=${page_number}`
    )
      .then(res => res.json())
      .then(movies => {
        dispatch({
          type: "ADD_MOVIES",
          payload: movies
        });
      })
      .catch((err)=>{
        alert(err)
      })
  };
};
export const movie_type =(type)=>{
  return dispatch=>{
    dispatch({
      type:'ADD_TYPE',
      payload:type
    })
  }
}
export const checkAuth =()=>{
  return dispatch =>{
  var id =  localStorage.getItem('session_id');
  if (id) {
    dispatch({
      type: "CHECK_AUTH",
      payload:true
    })
    return
  }else{
    dispatch({
      type: "CHECK_AUTH",
      payload:false
    })
  }
  }
}
export const slider_Movies = () => {
  return dispatch => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=25050db00f2ae7ba0e6b1631fc0d272f&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(movies => {
        dispatch({
          type: "ADD_MOVIES_TO_SLIDER",
          payload: movies.results
        });
        console.log(movies);
      })
      .catch((err)=>{
        console.log(err);
      })
  };
};
export const account_Details = (type,typeofProgramm,session)=>{
  return dispatch => {
    fetch(
      `https://api.themoviedb.org/3/account/{account_id}/${type}/${typeofProgramm}?api_key=25050db00f2ae7ba0e6b1631fc0d272f&session_id=${session}&sort_by=created_at.asc&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(movies => {

        if (movies.results.length<=0) {
          return
        }
        dispatch({
          type: "ADD_ACCOUNT_DETAIL",
          payload: movies.results
        });
        console.log(movies);
      })
      .catch((err)=>{
        console.log(err);
      })
  };
}
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
          type: "ADD_VIDEOS_URL",
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
