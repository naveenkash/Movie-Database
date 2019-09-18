import React, { Component } from 'react'
import store from '../../store'
import { connect } from "react-redux";
// function Genre(movie,genre) {
//         if (movie) {
//             return null
//         }
//         this.state.popularMovies.map((movie)=>(
//             movie.genre_ids.map((id)=>(
                
//                 this.genre.map((genre)=>(
//                  console.log(id,genre)
                 
//                 ))
//             ))
//         ))
// }

export class genre extends Component {
    constructor(props){
        super(props)
        this.state={
            genres:this.props.genres,
            movie:this.props.movie,
            arr:[]
        }
    }
    componentDidMount(){
        console.log('genre running');
        
        if (!this.props.movie) {
            return;
        }else{
         var movie_Genre_List = this.props.movie.genre_ids;
         if (movie_Genre_List.length>5) {
             movie_Genre_List.splice(0,5);
         }
         
        }
         var arr = []
         this.state.genres.forEach(function(singleObject){
             if(movie_Genre_List.includes(singleObject.id)){
                 arr.push(singleObject.name);
             }
         })
         this.setState({arr:arr})
         
    }
  
    render() {
        return (
            <div>
                  {this.state.arr.map((genre,i)=>(
                            <h4 key={i}>  {genre}</h4>
                        ))}
                
            </div>
        )
    }
}
// const mapStateToProps = state => ({
//     allMovies: state.all_Movies.slider_Movies,
  
//     genres: state.genresIds.genreIds,
//     // moviesVideoUrl : state.all_Movies.moviesVideoUrl
//   });
export default connect(
    null,
    { }
  )(genre);
  
