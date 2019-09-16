import React, { Component } from 'react'
import { connect } from "react-redux";
import store from "../../store";
import './movie.css';
import star from './star-regular.svg'
import { withRouter } from 'react-router-dom';
export class movies extends Component {
    constructor(props){
        super(props)
        this.state={
            movies:this.props.movies
        }
        var mov = []
        store.subscribe(()=>{
            if (store.getState().popularMovies && store.getState().popularMovies.movies) {
                mov= store.getState().popularMovies.movies
            }
            this.setState({movies:mov});
        })
    }
    SeeDeatil=(movie)=>{
    //    console.log( movie);
    // this.props.history.push(`/detail`);
    var showMovieDetail = true;
       this.props.detail(showMovieDetail)
       this.props.movie(movie)
    }
    
    render() {
        return (
            <div className="movies">
                    <div className="movie_wrapper">
              {
                  this.state.movies.map((movie)=>(
                       <div key={movie.id} className="movie_container">
                           <div onClick={()=>{this.SeeDeatil(movie)}} className="movie_poster">
                               <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""/>
                           </div>
                           <div className="movie_detail">
                               <div className="movie_name">
                                  <h4 onClick={()=>{this.SeeDeatil(movie)}}> {movie.title.length>=18? movie.title.slice(0,22)+' . . .' :movie.title}</h4>
                                  <p>{movie.release_date.split("-")[0]}</p>
                               </div>
                               <div className="movie_rating">
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
    movies: state.popularMovies.movies,
  });
  
export default connect(mapStateToProps,{})(movies);
// export default ;
