import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './allMovies.css';
import Header from '../pages/Header';
import BackToTopBtn from './BackToTopBtn';
import Footer from '../pages/Footer';

function AllMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scroll, setScroll] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


        const fetchMovies = async (page) => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=79c7dae27cf47e05e9fe3cbe39e0d621&page=${page}`);
                const data = await response.json();
                setMovies(data.results);
                setTotalPages(data.total_pages);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching movies:', error);
                setLoading(false);
            }
        };

        useEffect(() => {
            fetchMovies(currentPage);
        }, [currentPage]);


    // constantly listens to the scroll position
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navigate = useNavigate();

    const handleMovieClick = (movieId) => {
        navigate(`/movies/${movieId}`); // Redirect to the movie detail page
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <div className="container-fluid">
            <section>
                <div className='movies'>
                    {loading ? (
                        <p>Loading movies...</p>
                    ) : (
                        <>
                            <div className="row">
                                {movies.map((movie) => (
                                    <div className="col-md-3" key={movie.id}>
                                        <div className="card" onClick={() => handleMovieClick(movie.id)}>
                                            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="Movie Title" className="card-img-top" />
                                            <div className="card-body">
                                                <h5 className="card-title">{movie.title}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="pagination">
                                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                        Previous
                                    </button>
                                    <span>Page {currentPage} of {totalPages}</span>
                                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                        Next
                                    </button>
                            </div>
                        </>
                    )}
                </div>
                <Header scroll={scroll} />
                <Footer />
                <BackToTopBtn scroll={scroll} />
            </section>
        </div>
    );
}

export default AllMovies;