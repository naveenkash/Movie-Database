const initialState= {
    sessionToken:''
  }
  const add_Token = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_TOKEN":
        console.log('ADD_TOKEN');
        return {
          ...state,
          sessionToken:action.payload
        }
      default:
        return state;
    }
  };
  export default add_Token;
  