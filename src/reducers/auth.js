const auth = false;

const add_auth = (state = auth, action) => {
  switch (action.type) {
    case "IS_LOGGED_IN":
      return action.payload;

    default:
      return state;
  }
};
export default add_auth;
