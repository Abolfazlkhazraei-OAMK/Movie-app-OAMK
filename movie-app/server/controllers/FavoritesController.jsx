import axios from "axios";
import pool from "../helpers/db.js";

// Add a movie to the favorites table
const addFavorite = async (req, res, next) => {
    const { movieId } = req.body;
    const { user_id } = req.user.user_id;

    try {
        if (!movieId) return res.status(400).json({ message: 'Movie ID is required' });

        // Fetch movie details from the API
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_ACCESS_TOKEN}`);
        const { title, poster_path } = movieResponse.data;
        const posterUrl = `https://image.tmdb.org/t/p/original${poster_path}`;

        const query = `
            INSERT INTO favorites (user_id, movie_id, title, poster_url)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (user_id, movie_id) DO NOTHING
            RETURNING *
        `;
        const result = await pool.query(query, [user_id, movieId, title, posterUrl]);

        if (result.rowCount === 0) {
            return res.status(400).json({ message: 'Movie is already in favorites' });
        }
        res.status(201).json({ message: 'Movie added to favorites', favorite: result.rows[0] });
    } catch (error) {
        next(error);
    }
}

// Remove a movie from the favorites table
const removeFavorite = async (req, res, next) => {
    const { movieId } = req.body;
    const { user_id } = req.user.user_id;

    try {
        if (!movieId) return res.status(400).json({ message: 'Movie ID is required' });

        const query = `
            DELETE FROM favorites
            WHERE user_id = $1 AND movie_id = $2
            RETURNING *
        `;
        const result = await pool.query(query, [user_id, movieId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Movie not found in favorites' });
        }
        res.status(200).json({ message: 'Movie removed from favorites' });
    } catch (error) {
        next(error);
    }
}

// Get all favorites for the current user
const getFavorites = async (req, res, next) => {
    const { user_id } = req.user.user_id;

    try {
        const query = `
            SELECT movie_id, title, poster_url
            FROM favorites
            WHERE user_id = $1
        `;
        const result = await pool.query(query, [user_id]);

        if (result.rowCount === 0) {
            return res.status(200).json({ favorites: [] });
        }
        res.status(200).json({ favorites: result.rows });
    } catch (error) {
        next(error);
    }
}

export { addFavorite, removeFavorite, getFavorites };