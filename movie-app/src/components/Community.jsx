import React, { useState, useEffect } from 'react';
import './community.css';
import Header from '../pages/Header';
import BackToTopBtn from './BackToTopBtn';
import Footer from '../pages/Footer';

function Community() {
    const [community, setCommunity] = useState([]);
    const [newReviews, setNewReviews] = useState('');
    const [scroll, setScroll] = useState(0);
    const id = 550; // Movie ID for Fight Club
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=79c7dae27cf47e05e9fe3cbe39e0d621`);
                const data = await response.json();
                setCommunity(data);
            } catch (error) {
                console.log('error fetching data:', error);
            }
        }
        fetchData();
    }, [id]);

    const handleNewReview = async (movie_id) => {
        console.log(movie_id)
        if(newReviews.trim() === '') return;
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=79c7dae27cf47e05e9fe3cbe39e0d621`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newReviews, user: 'Anonymous' })
            })
            if(response.ok) {
                const newEntry = await response.json();
                setCommunity((prev) => [...prev, newEntry]);
                setNewReviews('');
            }
        } catch (error) {
            console.log('error adding review:', error);
        }
    }

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


  return (
    <section id="community" className='community'>
        <div className="container-fluid">
            <div className="row">
                <h4 className="section-title">Community Reviews</h4>
            </div>
            <div className="row mt-5">
                <div className="col-12 mb-4">
                    <textarea 
                    className="form-control" 
                    rows='3' 
                    placeholder='Write your review here...' 
                    value={newReviews}
                    onChange={(e) => setNewReviews(e.target.value)}
                    ></textarea>
                    <button className="btn btn-primary mt-2" onClick={() => handleNewReview(id)}>Post Review</button>
                </div>
                <div className="col-12">
                    {community && community.length > 0 ? ( community.map((review) => (
                        <div key={review} className='review-card'>
                            <h5>{review.user || 'Anonymous'}</h5>
                            <p>{review.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to share your thoughts!</p>
                )}
                </div>
            </div>
        </div>
        <Header scroll={scroll} />
        <Footer />
        <BackToTopBtn scroll={scroll} />
        <Router>
            <Routes>
                {/* Route for creating groups and listing them */}
                <Route path="/" element={<GroupCreate token={token} />} />

                {/* Route for owner dashboard */}
                <Route path="/owner/:groupId" element={<OwnerDashboard token={token} />} />

                {/* Route for viewing group details */}
                <Route path="/group/:groupId" element={<GroupDetails token={token} userId={userId} />} />
            </Routes>
        </Router>
    </section>
  )
}

export default Community