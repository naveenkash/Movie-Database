const  auth=false
  
  const add_Genres = (state = auth, action) => {
    switch (action.type) {
      case "CHECK_AUTH":
        return  action.payload
        
      default:
        return state;
    }
  };
  export default add_Genres;
  