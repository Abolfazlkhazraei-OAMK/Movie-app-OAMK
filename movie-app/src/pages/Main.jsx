import React from 'react';
import './main.css';
import Schedule from './Schedule';
import Trend from './Trend';
import Community from './Community';

function Main() {
  return (
    <main>
        <Schedule />
        <Trend />
        <Community />
    </main>
  )
}

export default Main