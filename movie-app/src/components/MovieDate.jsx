import React from 'react';
import './movieDate.css';

function MovieDate({movie}) {
  return (
    <div className={`date ${movie.active ? 'active' : undefined}`}>
        <h2>Release Date: {movie.release_date}</h2>
    </div>
  )
}

export default MovieDate