import movies from "./movies";
import add_Genres from "./genereIds";
import auth from "./auth";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  movies: movies,
  genreIds: add_Genres,
  auth: auth,
});
export default allReducers;
