import React, { Component } from "react";
import { connect } from "react-redux";
import { all_Movies, genresIds, getVideoUrl } from "../../actions";
import Genre from "./genre";
import Slider from "react-slick";
import "./slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store from "../../store";
 
function Title(movie) {

  if (movie.movie.original_title || movie.movie.original_name) {
    return null;
  }
  
  return (
    <div className="banner-info-wrapper">
      <h1>{movie.movie.title}</h1>
     
    </div>
  );
}
function OriginalTitle(movie) {
  return (
    <div className="banner-info-wrapper">
      <h1>{movie.movie.title}</h1>
     
    </div>
  );
}
function OriginalName(movie) {
  if (movie.movie.original_title || movie.movie.title) {
    return null;
  }
  return (
    <div className="banner-info-wrapper">
      <h1>{movie.movie.title}</h1>
     
    </div>
  );
}
export class slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: this.props.genres,
      all_Movies:  [],
    };
   
  }
  componentDidMount() {
    this.props.all_Movies(()=>{
          var popMovie  = []
          if (store.getState().all_Movies && store.getState().all_Movies.movies) {
            popMovie = store.getState().all_Movies.movies
          
            }
            
          this.setState({
            all_Movies: popMovie,
            genre: store.getState().genresIds.genreIds,
            // videoUrl:true
          });
    },'popular');
    this.props.genresIds();

  }

  render() {
    // {this.watchTrailer()}
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      adaptiveHeight: true,
      arrows: false,
      slidesPerRow: 1,
      mobileFirst: true
    };
    
    return (
      <div className="header-slider">
        <Slider {...settings}>
          {this.props.allMovies.slice(0, 10).map(movie => (
            <div key={movie.id} className="header-slide-container">
              <div className="header-slide">
                <div className="overlay"></div>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt=""
                />
                <div className="banner-info">
                
                  <Genre movie={movie} />
                  {(() => {
                    if (!movie.title) {
                      return null;
                    }
                    return <Title movie={movie} />;
                  })()}
                  {(() => {
                    if (!movie.original_title) {
                      return null;
                    }
                    return <OriginalTitle movie={movie} />;
                  })()}
                  {(() => {
                    if (!movie.original_name) {
                      return null;
                    }
                    return <OriginalName movie={movie} />;
                  })()}
                  <p>{movie.overview}</p>
                  <h3>{movie.release_date.split("-")[0]}</h3>
                 
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allMovies: state.all_Movies.movies,

  genres: state.genresIds.genreIds,
  moviesVideoUrl : state.all_Movies.moviesVideoUrl
});

export default connect(
  mapStateToProps,
  { all_Movies, genresIds, getVideoUrl }
)(slider);
