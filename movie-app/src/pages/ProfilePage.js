import React, { useEffect, useState } from 'react'
import FavoriteItem from '../components/FavoriteItem'
import axios from 'axios'

export default function ProfilePage({user}) {
    const [reviews, setReviews] = useState([])
    const [favorites, setFavorites] = useState([])

    const url = process.env.REACT_APP_API_URL

    useEffect(() => {
        
    })

    return (
        <div className="userProfile">
            <h3 id='username'>{user.firstname + user.lastname}</h3>
            <h2 id='userReviews'>Reviews</h2>
            {
                reviews.length === 0 
                ? 
                "User has not posted any reviews" 
                : 
                reviews.map((review) => (
                    <div key={review} className='review-card'>
                        <p>{review.content}</p>
                    </div>
                ))
            }
            <h2 id='userFavorites'>Favorites</h2>
            {
                favorites.length === 0 
                ? 
                "User has no favorites" 
                : 
                favorites.map((favorite) => <FavoriteItem key={favorite.id} favorite={favorite}/>)
            }
        </div>
    )
}