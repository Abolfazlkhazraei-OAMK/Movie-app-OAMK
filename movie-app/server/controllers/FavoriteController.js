import { emptyOrRows } from "../helpers/utils.js"
import { insertFavorite, selectFavoritesByUserId } from "../models/Favorites.js"


const getFavoritesByUserId = async (req,res,next) => {
    try {
        const result = await selectFavoritesByUserId(req.params.user_id)
        return res.status(200).json(emptyOrRows(result))
    } catch (error) {
        return next(error)
    }
}

const postFavorite = async (req,res,next) => {
    try {
        const added_at = new Date().toLocaleString()
        const favorites = await insertFavorite(req.params.user_id,req.params.movie_id,added_at)
        const favorite = favorites.rows[0]

        res.status(200).json({
            "favorite_id": favorite.favorite_id,
            "user_id": favorite.user_id,
            "movie_id": favorite.movie_id,
            "added_at": favorite.added_at
        })
    } catch (error) {
        return next(error)
    }
}

export { getFavoritesByUserId, postFavorite }