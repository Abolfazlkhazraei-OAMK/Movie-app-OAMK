import React, { useEffect, useState } from 'react'
import FavoriteItem from '../components/FavoriteItem.jsx'
import axios from 'axios'
import './profilePage.css'
import { Link, useParams } from 'react-router-dom'

export default function ProfilePage() {
    const { userId } = useParams();
    const [user, setUser] = useState({})
    const [reviews, setReviews] = useState([])
    const [favorites, setFavorites] = useState([])
    const currentUser = JSON.parse(sessionStorage.getItem('user'))

    const url = process.env.REACT_APP_API_URL

    const getUser = () => {
        axios.get(url + '/users')
            .then(response => {
                const userFromDB = response.data.find((data) => data.user_id.toString() === userId)
                setUser(userFromDB)
            }).catch(error => {
                alert(error)
            })
    }

    const getFavorites = () => {
        axios.get(url + `/favorites/${userId}`)
            .then(response => {
                setFavorites(response.data)
            }).catch(error => {
                alert(error)
            })
    }

    useEffect(() => {
        getUser()
        getFavorites()
    })

    return (
        <React.Fragment>
        <main>
            <section>
            <div className="userProfile">
                <h2 id='username'>{user.firstname + " " + user.lastname}</h2>
                <h5 id='creationDate'>{new Date(user.created_at).toString().slice(0, 24)}</h5>
                {
                    user.user_id !== currentUser.id ? null : <Link>Delete Account</Link>
                }
                <br/>
                <br/>
                <h2 id='userReviews'>Reviews</h2>
                {
                    reviews.length === 0 
                    ? 
                    <p>User has not posted any reviews</p>
                    : 
                    reviews.map((review) => (
                        <div key={review} className='review-card'>
                            <p>{review.content}</p>
                        </div>
                    ))
                }
                <br/>
                <br/>
                <h2 id='userFavorites'>Favorites</h2>
                {
                    favorites.length === 0 
                    ? 
                    <p>User has no favorites</p>
                    : 
                    favorites.map((favorite) => <FavoriteItem key={favorite.id} favorite={favorite}/>)
                }
            </div>
            </section>
        </main>
        </React.Fragment>
    )
}