import React, { Component } from 'react'
import './side_navbar.css';
import { connect } from "react-redux";
import { all_Movies} from "../../actions";
export class side_navbar extends Component {
    constructor(props){
        super(props)

    }
    popularMovies=()=>{
        this.props.all_Movies(()=>{},'popular')
    }
    topRatedMovies=()=>{
        this.props.all_Movies(()=>{},'top_rated')
    }

    nowPlayingMovies=()=>{
        this.props.all_Movies(()=>{},'now_playing')
    }
    upcomingMovies=()=>{
        this.props.all_Movies(()=>{},'upcoming')
    }

    // latestMovies=()=>{
    //     this.props.all_Movies(()=>{},'latest')
    // }
    render() {
        return (
            <div className="side_navbar">
                <div className="side_navbar_wrapper">

               
              <div className="side_logo">
                 <h1> Filmastic</h1>
              </div>
              <div className="side_navbar_container">
                  <div className="side_category">
                      <h1 className="side_category_head">Categories</h1>
                      <ul>
                          <li onClick={this.popularMovies} >Popular</li>
                          <li onClick={this.topRatedMovies}>Top Rated</li>
                          <li onClick={this.nowPlayingMovies}>Now Playing</li>
                          <li onClick={this.upcomingMovies}>Upcoming</li>
                          {/* <li onClick={this.latestMovies}>Latest</li> */}
                      </ul>
                  </div>
              </div>
            </div> 
            </div>
        )
    }
}

// const mapStateToProps = state => ({
//     allMovies: state.all_Movies.movies,
  
//     genres: state.genresIds.genreIds,
//     moviesVideoUrl : state.all_Movies.moviesVideoUrl
//   });
  
export default connect(
    null,
    { all_Movies }
  )(side_navbar);
  
  
