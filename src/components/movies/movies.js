import React, { Component } from 'react'
import { connect } from "react-redux";
import store from "../../store";
import './movie.css';
export class movies extends Component {
    constructor(props){
        super(props)
        this.state={
            movies:this.props.movies
        }
        // var mov = []
        // store.subscribe(()=>{
        //     if (store.getState().popularMovies && store.getState().popularMovies.movies) {
        //         mov= store.getState().popularMovies.movies
        //     }
        //     this.setState({movies:mov});
        // })
    }
    SeeDeatil=(movie)=>{
    var showMovieDetail = true;
       this.props.detail(showMovieDetail)
       this.props.movie(movie)
    }
    addToWatchList=(movie)=>{
        var Sessio_Id = localStorage.getItem('session_id');
        fetch(`https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=25050db00f2ae7ba0e6b1631fc0d272f&session_id=${Sessio_Id}`,{
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
                                <div onClick={()=>{this.addToWatchList(movie)}} className="add_to_waatchlist">
                                    <i><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bookmark" className="svg-inline--fa fa-bookmark fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"></path></svg></i></div> 
                                     <i><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star" className="svg-inline--fa fa-star fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></svg></i> <h4>{movie.vote_average}</h4>
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
  
export default connect(mapStateToProps,{})(movies);
// export default ;
