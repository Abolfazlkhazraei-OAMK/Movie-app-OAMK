import React, { useState, useEffect } from 'react';
import './community.css';

function Community() {
    const [community, setCommunity] = useState([]);
    const [newReviews, setNewReviews] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=79c7dae27cf47e05e9fe3cbe39e0d621');
            const data = await response.json();
            setCommunity(data);
        } catch (error) {
            console.log('error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleNewReview = async () => {
        if(newReviews.trim() === '') return;
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=79c7dae27cf47e05e9fe3cbe39e0d621', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({content: newReviews, user: 'Anonymous'})
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


  return (
    <section id="community" className='community'>
        <div className="container-fluid">
            <div className="row" data-aos='fade-up' data-aos-delay='100'>
                <h4 className="section-title">Community Reviews</h4>
            </div>
            <div className="row mt-5" data-aos='fade-up' data-aos-delay='300'>
                <div className="col-12 mb-4">
                    <textarea 
                    className="form-control" 
                    rows='3' 
                    placeholder='Write your review here...' 
                    value={newReviews}
                    onChange={(e) => setNewReviews(e.target.value)}
                    ></textarea>
                    <button className="btn btn-primary mt-2" onClick={handleNewReview}>Post Review</button>
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
    </section>
  )
}

export default Community