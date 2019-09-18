import React, { Component } from 'react'
import { connect } from "react-redux";
import { all_Movies} from "../../actions";
// import store from "../../store";
import './movie.css';
export class movies extends Component {
    constructor(props){
        super(props)
        this.state={
            movies:this.props.movies,
            // Session_Id :localStorage.getItem('session_id')
        }
        // var mov = []
        // store.subscribe(()=>{
        //     if (store.getState().popularMovies && store.getState().popularMovies.movies) {
        //         mov= store.getState().popularMovies.movies
        //     }
        //     this.setState({movies:mov});
        // })
    }
    componentDidMount() {
        this.props.all_Movies(()=>{},'popular');
    }
    
    SeeDeatil=(movie)=>{
    var showMovieDetail = true;
       this.props.detail(showMovieDetail)
       this.props.movie(movie)
    }
    addToWatchList=(movie)=>{
        var Session_Id = localStorage.getItem('session_id');
        if (!Session_Id) {
            return alert('Login Before Adding')
        }
        fetch(`https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=25050db00f2ae7ba0e6b1631fc0d272f&session_id=${Session_Id}`,{
            method:'POST',
            headers: {
                "Content-type": 'application/json; charset-UTF-8'
            },
            body:JSON.stringify({
                "media_type": "movie",
                "media_id": movie.id,
                "watchlist": true
              })
        })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    addToFavorite=(movie)=>{
        var Session_Id = localStorage.getItem('session_id');
        if (!Session_Id) {
            return alert('Login Before Adding')
        }
        fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=25050db00f2ae7ba0e6b1631fc0d272f&session_id=${Session_Id}`,{
            method:'POST',
            headers: {
                "Content-type": 'application/json; charset-UTF-8'
            },
            body:JSON.stringify({
                "media_type": "movie",
                "media_id": movie.id,
                "favorite": true
              })
        })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    render() {
        return (
            <div className="movies">
                    <div className="movie_wrapper">
              {
                  this.props.movies.map((movie)=>(
                       <div key={movie.id} className="movie_container">
                           <div onClick={()=>{this.SeeDeatil(movie)}} className="movie_poster">
                               <img  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""/>
                           </div>
                           <div className="movie_detail">
                               <div className="movie_name">
                                  <h4 onClick={()=>{this.SeeDeatil(movie)}}> {movie.title.length>=18? movie.title.slice(0,22)+' . . .' :movie.title}</h4>
                                  <p>{movie.release_date.split("-")[0]}</p>
                               </div>
                               <div className="movie_rating">

                                   <i title="Add To Favorite" onClick={()=>{this.addToFavorite(movie)}} ><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" className="svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg></i>
                                <div onClick={()=>{this.addToWatchList(movie)}} className="add_to_waatchlist">
                                    <i title="Add To Watchlist"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bookmark" className="svg-inline--fa fa-bookmark fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path></svg></i></div> 

                                     <i title="Rating"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg></i> 
                                     <h4>{movie.vote_average}</h4>
                               </div>
                           </div>
                       </div>
                  
                  ))
              } 
               </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    movies: state.all_Movies.movies,
  });
  
export default connect(mapStateToProps,{all_Movies})(movies);
// export default ;
