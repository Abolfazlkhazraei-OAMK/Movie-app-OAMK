// import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Swiper styles
import 'swiper/css';

// import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

import React, { useState, useEffect } from 'react';
import './App.css';
import Banner from './pages/Banner';
import Header from './pages/Header';
import Main from './pages/Main';
import Footer from './pages/Footer';
import BackToTopBtn from './components/BackToTopBtn';
//import GroupCreateComponent from './components/GroupCreate';

function App() {
  // the scroll position of the window
  const [scroll, setScroll] = useState(0);
  //const isAuthenticated = Boolean(sessionStorage.getItem('token'));

  // constantly listens to the scroll position
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener('scroll', () => {
        setScroll(window.scrollY);
      })
    }
  }, [scroll])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: false
    })
  }, []);

  return ( 
    <>
       <Header scroll={scroll} />
       <Banner />
       <Main />
       <Footer />
       <BackToTopBtn scroll={scroll} />
    </>
  );
}

export default App;
