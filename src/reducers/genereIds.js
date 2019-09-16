const initialState= {
    genreIds:[]
  }
  const add_Genres = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_GENRES":
        return {
          ...state,
          genreIds:action.payload
        }
      default:
        return state;
    }
  };
  export default add_Genres;
  