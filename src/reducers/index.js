import all_Movies from './movies';
import add_Genres from './genereIds'
import add_Token from './addsessiontoke'
import {combineReducers} from 'redux';
const allReducers = combineReducers({
    all_Movies:all_Movies,
    genresIds:add_Genres,
    token:add_Token
})
export default allReducers