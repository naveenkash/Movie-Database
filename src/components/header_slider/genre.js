import React, { Component } from 'react'
import store from '../../store'
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
            genre:this.props.genre,
            movie:this.props.movie,
            arr:[]
        }
        // this.arr =[];
        

        store.subscribe(() => {
            // When state will be updated(in our case, when items will be fetched), 
            // we will update local component state and force component to rerender 
            // with new data.
      
            this.setState({
                // popularMovies: store.getState().popularMovies.movies,
                genre:store.getState().genresIds.genreIds
            }
            ,()=>{
                // console.log('on genre refresh');
               if (!this.state.movie) {
                   return;
               }else{
                // console.log(this.state.movie);
                // console.log(this.state.genre);
                var movie_Genre_List = this.state.movie.genre_ids;
                if (movie_Genre_List.length>5) {
                    movie_Genre_List.splice(0,5);
                }
               }
                var arr = []
                this.state.genre.forEach(function(singleObject){
                    // console.log(this.state.popularMovies)
                    if(movie_Genre_List.includes(singleObject.id)){
                        arr.push(singleObject.name);
                    }
                })
                this.setState({arr:arr})
                
                    //  console.log(this.state.genre);
            }
            );
          });
        
    }
    componentDidMount(){
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

export default genre
