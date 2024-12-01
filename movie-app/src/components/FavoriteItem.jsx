import React from 'react'

export default function FavoriteItem({favorite}) {

    return (
        <div className='favorite'>
            <img src={favorite.imageUrl} alt="Preview" className='img-fluid' />
            <h4>{favorite.title}</h4>
        </div>
    )
}