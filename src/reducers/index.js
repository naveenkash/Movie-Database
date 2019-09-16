import popularMovies from './upcomingMovies';
import add_Genres from './genereIds'
import add_Token from './addsessiontoke'
import {combineReducers} from 'redux';
const allReducers = combineReducers({
    popularMovies:popularMovies,
    genresIds:add_Genres,
    token:add_Token
})
export default allReducers