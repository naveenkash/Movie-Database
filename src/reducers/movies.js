const initialState = {
  movies: [],
  sliderMovies: [],
  type: "",
  userMovieType: "",
  fav_movies: [],
};
const movies = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MOVIES":
      return {
        ...state,
        movies: action.payload.results || [],
        total_pages: action.payload.total_pages || 0,
        current_page: action.payload.page || 1,
      };
    case "ADD_USER_FAV_MOVIES":
      return {
        ...state,
        fav_movies: action.payload.results || [],
        total_pages: action.payload.total_pages || 0,
        current_page: action.payload.page || 1,
      };
    case "ADD_MOVIES_TO_SLIDER":
      return {
        ...state,
        sliderMovies: action.payload || [],
      };
    case "ADD_MOVIE_TYPE":
      return {
        ...state,
        type: action.payload,
      };
    case "ADD_USER_MOVIE_TYPE":
      return {
        ...state,
        userMovieType: action.payload,
      };
    default:
      return state;
  }
};
export default movies;
