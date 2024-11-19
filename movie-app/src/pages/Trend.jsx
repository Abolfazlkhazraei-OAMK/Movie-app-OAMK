import React, { useState, useEffect } from 'react';
import './trend.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay } from 'swiper/modules';
import TrendCard from '../components/TrendCard';

function Trend() {
    const [slides, setSlides] = useState([]);
    const fetchData = () => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=79c7dae27cf47e05e9fe3cbe39e0d621')
        .then(response => response.json())
        .then(json => {
            setSlides(json.results);
        })
        .catch(error => console.log(error.message));
    }

    useEffect(() => {
        fetchData();
    }, []);
    
  return (
    <section id="trend" className='trend'>
        <div className="container-fluid">
            <div className="row"  data-aos='fade-up' data-aos-delay='100'>
                <h4 className="section-title">Trending</h4>
            </div>
            <div className="row"  data-aos='fade-up' data-aos-delay='300'>
                <Swiper
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        480: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        640: {
                            slidesPerView: 4,
                            spaceBetween: 30
                        },
                        992: {
                            slidesPerView: 6,
                            spaceBetween: 30
                        }
                    }}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false
                    }}
                    loop={true}
                    modules={[Autoplay]}
                    className='trendSwiper'                
                >
                    {slides && slides.length > 0 && slides.map(slide => (
                        <SwiperSlide key={slide.id}>
                            <TrendCard slide={slide} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    </section>
  )
}

export default Trend