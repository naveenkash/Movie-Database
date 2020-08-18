const initialState = {
  movies: [],
  moviesVideoUrl: [],
  slider_Movies: [],
  type: "",
};
const all_Movies = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MOVIES":
      return {
        ...state,
        movies: action.payload.results,
        total_pages: action.payload.total_pages,
        current_page: action.payload.page,
      };
    case "ADD_ACCOUNT_DETAIL":
      return {
        ...state,
        movies: action.payload.results,
        total_pages: action.payload.total_pages,
        current_page: action.payload.page,
      };
    case "ADD_MOVIES_TO_SLIDER":
      return {
        ...state,
        slider_Movies: action.payload,
      };
    case "ADD_TYPE":
      return {
        ...state,
        type: action.payload,
      };

    default:
      return state;
  }
};
export default all_Movies;
