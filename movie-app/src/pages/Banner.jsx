import React from 'react';
import { useState, useEffect } from 'react';
import './banner.css';
import MovieContent from '../components/MovieContent';
import MovieDate from '../components/MovieDate';
import OverviewBtn from '../components/OverviewBtn';
import MovieSwiper from '../components/MovieSwiper';

function Banner() {
    const [movieList, setMovieList] = useState([]);

    const fetchMovies = async () => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=79c7dae27cf47e05e9fe3cbe39e0d621')
        .then(response => response.json())
        .then(json => setMovieList(json.results))
        .catch(error => console.log(error.message))
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleSlideChange = id => {
        //console.log('Slide change', id);
        const newMovieList = movieList.map(movie => {
            if(movie.id === id) {
                return {...movie, active: true};
            }
            return {...movie, active: false};
        })
        setMovieList(newMovieList);
    }


  return (
    <div className="banner">
        {movieList && movieList.length > 0 && movieList.map((movie) => (
        <div className="movie">
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="Background" className={`bgImg ${movie.active ? 'active' : undefined}`}/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <MovieContent movie={movie} />
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <MovieDate movie={movie} />
                        <OverviewBtn movie={movie} />
                    </div>
                </div>
            </div>
        </div>
        ))}
        {movieList && movieList.length > 0 && <MovieSwiper slides={movieList} slideChange={handleSlideChange} />}
    </div>
  )
}

export default Banner