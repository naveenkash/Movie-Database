const initialState= {
  movies:[],
  moviesVideoUrl:[]
}
const popularMovies = (state = initialState, action) => {
  
  switch (action.type) {
    case "ADD_POPULAR_MOVIES":
      return {
        ...state,
        movies:action.payload,
      
      }
      case "ADD_POPULAR_VIDEOS":
        console.log('add_popular_videos');
        return{
          ...state,
          moviesVideoUrl:[...state.moviesVideoUrl,action.videoPayload]
        }
        
    default:
      return state;
  }
};
export default popularMovies;
