import { Router } from "express";
import { getFavoritesByUserId, postFavorite } from "../controllers/FavoriteController.js";
import { auth } from "../helpers/auth.js";

const favoriteRouter = Router()

favoriteRouter.get('/favorites/:user_id',(req,res,next) => {
    getFavoritesByUserId(req,res,next)
})

favoriteRouter.post('/favourites/:user_id/add/:movie_id',auth,(req,res,next) => {
    postFavorite(req,res,next)
})

export { favoriteRouter }