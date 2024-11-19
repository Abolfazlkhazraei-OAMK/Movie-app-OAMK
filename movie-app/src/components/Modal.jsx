import React from 'react';
import './modal.css';

function Modal({movie, status, toggleModal}) {
  return (
    <div className={`movieModal ${status ? 'active' : undefined}`}>
        <a className="modalClose" onClick={toggleModal}>
            <ion-icon name="close-outline"></ion-icon>
        </a>
        <div className="movieOverview">
            <h2>Movie Overview</h2>
            <p>{movie.overview}</p>
        </div>
    </div>
  )
}

export default Modal