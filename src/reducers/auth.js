const  auth=false
  
  const add_auth = (state = auth, action) => {
    switch (action.type) {
      case "CHECK_AUTH":
        return  action.payload
        
      default:
        return state;
    }
  };
  export default add_auth;
  