import React from 'react';
import './trendCard.css';

function TrendCard({ slide }) {
  return (
    <div className="trend-card">
        <img src={`https://image.tmdb.org/t/p/original${slide.poster_path}`} alt="" className="img-fluid" />
        <a href="/trending">
            Add to calendar <ion-icon name="calendar-outline"></ion-icon>
        </a>
    </div>
  )
}

export default TrendCard