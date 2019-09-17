import React, { Component } from "react";
import "./movie_detail.css";
import store from "../../store";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export class movie_detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      genres: [],
      noVideo: false,
      cast:[],
      crew:[]
    };
  }
  componentDidMount() {
    console.log(this.props);
    fetch(
      `https://api.themoviedb.org/3/movie/${this.props.movie.id}/videos?api_key=25050db00f2ae7ba0e6b1631fc0d272f&language=en-US`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);

        if (data.results.length <= 0) {
          this.setState({
            noVideo: true
          });
        }

        if (data.results.length >= 1) {
          console.log(data.results);

          console.log("running results is not empty");

          this.setState({
            key: data.results[0].key
          });

          const GENRES_ARRAY = store.getState().genresIds.genreIds;

          this.props.movie.genre_ids.forEach(movie_id => {
            GENRES_ARRAY.forEach(single_genre => {
              if (movie_id === single_genre.id) {
                console.log(single_genre.name);
                this.setState({
                  genres: [...this.state.genres, single_genre.name]
                });
              }
            });
          });
        }
        console.log(this.state.genres);
      });

      fetch(`https://api.themoviedb.org/3/movie/${this.props.movie.id}/credits?api_key=25050db00f2ae7ba0e6b1631fc0d272f`)
      .then((res)=>{
        return res.json();
      })
      .then((data)=>{
        console.log(data);
        data.cast.forEach((cast)=>{
          if (this.state.cast.length>=10) {
            return
          }
          this.setState({
            cast: [...this.state.cast, cast]
          });
        })
        console.log(this.state.cast);
        data.crew.forEach((crew)=>{
          if (crew.job==="Director") {
            this.setState({
              crew: [...this.state.crew, crew]
            });
          }
        })
        console.log(this.state.crew);
        
      })
  }
  closeDtail = () => {
    var closeDetail = false;
    this.props.closeDetail(closeDetail);
  };
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      draggable: true,
      // adaptiveHeight: true,
      arrows: true,
      slidesPerRow: 1,
      mobileFirst: true
    };
    return (
      <div className="movie_info">
        
        <div className="movie_info_wrapper">
        <div className="movie_info_banner">
          <div className="movie_info_img">
            <div className="movie_back_img">
              <img
                src={`https://image.tmdb.org/t/p/original/${this.props.movie.backdrop_path}`}
                alt={this.props.title}
              />
            </div>
            <div className="movie_poster_img">
              <img
                src={`https://image.tmdb.org/t/p/original/${this.props.movie.poster_path}`}
                alt={this.props.title}
              />
            </div>
          </div>
        </div>
        
        <div className="close_detail" onClick={this.closeDtail}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="times"
              className="svg-inline--fa fa-times fa-w-11"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
            >
              <path
                fill="currentColor"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              ></path>
            </svg>
          </div>
     

        
          <div className="movie_info_container">
            <div className="movie_video">
              {(() => {
                if (this.state.noVideo) {
                  return <h1>Sorry no video!</h1>;
                }
                return (
                  <iframe
                    src={`https://www.youtube.com/embed/${this.state.key}`}
                  ></iframe>
                );
              })()}
            </div>
            <div className="movie_info_detail">
              <h1>{this.props.movie.title}</h1>
              <div className="genre_category">
                {this.state.genres.map(gen => (
                  <h5 key={gen}>{gen}</h5>
                ))}
              </div>
                  <h4>Overview</h4>
              <p>{this.props.movie.overview}</p>
                <h4>Cast</h4>
              <div className="movie_detail_slider">
              <Slider {...settings}>
               {
                 this.state.cast.map((cast)=>(
                  
                      <div key={cast.id} className="movie_slider_wrapper">
                        <img src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} alt=""/>
                        <div className="movie_overlay">
                          <h5>{cast.name}</h5>
                        </div>
                          {/* <h5>{cast.name}</h5> */}
                      </div>
                   
                 ))
               }
               
              </Slider>
              </div>
                  <h4>Director</h4>
              {
                this.state.crew.map((crew)=>(
                  <div className="director">
                  <h1>{crew.name}</h1></div>
                ))
              }
            </div>
          </div>
        </div>
       
      </div>
    );
  }
}

export default movie_detail;
