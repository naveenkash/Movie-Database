const initialState= {
  movies:[],
  moviesVideoUrl:[],
  slider_Movies:[]
}
const all_Movies = (state = initialState, action) => {
  
  switch (action.type) {
    case "ADD_MOVIES":
      return {
        ...state,
        movies:action.payload,
      
      }
      case "ADD_ACCOUNT_DETAIL":
        console.log(action.payload);
        
          return {
            ...state,
            movies:action.payload,
        
          
          }
      case 'ADD_MOVIES_TO_SLIDER':
        return{
          ...state,
          slider_Movies:action.payload
        }
        
    default:
      return state;
  }
};
export default all_Movies;
