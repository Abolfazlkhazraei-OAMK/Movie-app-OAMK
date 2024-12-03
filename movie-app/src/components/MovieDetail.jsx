import React, { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../pages/Header';
import Footer from '../pages/Footer';
import BackToTopBtn from './BackToTopBtn';
import './movieDetail.css';

function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [review, setReview] = useState('');
    const [scroll, setScroll] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=79c7dae27cf47e05e9fe3cbe39e0d621`);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.log('Error fetching movie details:', error);
            }
        }
        fetchMovieDetail();
    }, [id]);

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

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        // Handle the form submission
        console.log('Review submitted', reviews);
        console.log('User rating:', userRating);
        const newReview = {
            text: review,
            rating: userRating,
            date: new Date().toLocaleString() // Add date for display
        }
        setReviews([...reviews, newReview]); // Add the new review to the reviews array
        setReview(''); // Clear the review input
        setUserRating(0); // Reset the rating after submission
    }

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        if (!isFavorite) {
            // Logic to add to favorites
            console.log(`${movie.title} added to favorites.`);
        } else {
            // Logic to remove from favorites
            console.log(`${movie.title} removed from favorites.`);
        }
    }

    const handleShare = () => {
        const shareData = {
            title: movie.title,
            text: `Check out this movie! ${movie.title}`,
            url: window.location.href, // Current URL of the movie detail page
        }

        if (navigator.share) {
            navigator.share(shareData)
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.log('Error sharing:', error));
        } else {
            // Fallback for browsers that do not support Web Share API
            alert('Sharing is not supported on this browser. Copy this link:' + window.location.href);
        }
    }

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    }

    if (!movie) return <p>Loading...</p>;

  return (
    <div className='container-fluid'>
        <section>        
        <div className="movie-detail">
                <div className="poster-container">
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="movie-poster" />
                    <div className="button-container">
                        <button onClick={handleGoBack} className="back-button">
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </button>
                        <button onClick={toggleFavorite}>
                            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                        <button onClick={handleShare}>
                            Share
                        </button>
                    </div>
                </div>
                <div className="movie-info">
                    <h2>{movie.title}</h2>
                    <p className="movie-rating">Rating: {movie.vote_average.toFixed(1)}</p>
                    <p className="movie-overview">{movie.overview}</p>
                    <form className="review-form" onSubmit={handleReviewSubmit}>
                        <textarea
                            className="form-control"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your review here..."
                        />
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <span key={rating} onClick={() => setUserRating(rating)} className="star">
                                    <ion-icon name={userRating >= rating ? "star" : "star-outline"}></ion-icon>
                                </span>
                            ))}
                        </div>
                        <button className='btn btn-primary mt-2' type="submit">Submit Review</button>
                    </form>
                </div>
            </div>
        </section>
        <Header scroll={scroll} />
        <Footer />
        <BackToTopBtn scroll={scroll} />
    </div>
  )
}

export default MovieDetail