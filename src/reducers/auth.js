const  auth=false
  
  const add_Genres = (state = auth, action) => {
      console.log(action.payload);
      
    switch (action.type) {
      case "CHECK_AUTH":
        return  action.payload
        
      default:
        return state;
    }
  };
  export default add_Genres;
  