import React from 'react';
import './movieContent.css';
import Button from './Button';

function MovieContent({movie}) {
  return (
    <div className={`content ${movie.active ? 'active' : undefined}`}>
        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="Movie Title" className="movie-title" />
                <h4>
                  <span>{movie.original_title}</span>
                  <span>
                      <i>{movie.vote_average.toFixed(1)}</i>
                  </span>
                  <span>{movie.original_language}</span>
                  
                </h4>
                <p>
                  
                </p>
        <div className="button">
          <Button icon={<ion-icon name="bookmark-outline"></ion-icon>} name='Save' color='#ff3700' bgColor='#ffffff' />
          <Button icon={<ion-icon name="add-outline"></ion-icon>} name='My List' />
        </div>
    </div>
  )
}

export default MovieContent