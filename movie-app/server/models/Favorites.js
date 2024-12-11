import pool from "../helpers/db.js";

const insertFavorite = async (user_id, movie_id, added_at) => {
    return await pool.query('insert into Favorites (user_id, movie_id, added_at) values ($1, $2, $3) returning *', [user_id, movie_id, added_at])
}

const selectFavoritesByUserId = async (user_id) => {
    return await pool.query('select from Favorites where user_id = $1', [user_id])
}

export { insertFavorite, selectFavoritesByUserId }