import React from 'react';
import { useState } from 'react';
import './overviewBtn.css';
import Modal from './Modal';

function OverviewBtn({movie}) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }

  return (
    <>
      <div className={`overview d-flex align-items-center justify-content-center ${movie.active ? 'active' : undefined}`}>
          <a href="#" className="overviewBtn" onClick={toggleModal}>
              <ion-icon name="eye-outline"></ion-icon>
          </a>
          <p>Overview</p>
      </div>
      {movie.active && <Modal movie={movie} status={modal} toggleModal={toggleModal} />}
    </>
  )
}

export default OverviewBtn