const initialState= {
  movies:[],
  moviesVideoUrl:[]
}
const all_Movies = (state = initialState, action) => {
  
  switch (action.type) {
    case "ADD_POPULAR_MOVIES":
      return {
        ...state,
        movies:action.payload,
      
      }
      case "ADD_VIDEOS_URL":
        return{
          ...state,
          moviesVideoUrl:[...state.moviesVideoUrl,action.videoPayload]
        }
        
    default:
      return state;
  }
};
export default all_Movies;
