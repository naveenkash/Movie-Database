import all_Movies from "./movies";
import add_Genres from "./genereIds";
import auth from "./auth";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  all_Movies: all_Movies,
  genresIds: add_Genres,
  auth: auth,
});
export default allReducers;
