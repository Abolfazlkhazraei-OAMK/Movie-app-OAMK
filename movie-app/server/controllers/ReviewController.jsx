import pool from "../helpers/db";
import { ApiError } from "../helpers/ApiError";

// Add a review for a movie
const addReview = async (req, res, next) => {
    const { movieId, movie_title, review_text, rating } = req.body;

    // Valuable input
    if (!movieId || !movie_title || !review_text || typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    const user_id  = req.user.user_id; // Ensure user is authenticated

    try {
        // Check if the user has already reviewed this movie
        const reviewQuery = `
            SELECT *
            FROM reviews
            WHERE user_id = $1 AND movie_id = $2
        `;
        const reviewResult = await pool.query(reviewQuery, [user_id, movieId]);

        if (reviewResult.rowCount > 0) {
            return res.status(400).json({ message: 'Review already exists' });
        }

        // Insert the review with 'movie_title'
        const insertReviewQuery = `
            INSERT INTO reviews (user_id, movie_id, movie_title, review_text, rating)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const result = await pool.query(insertReviewQuery, [user_id, movieId, movie_title, review_text, rating]);
        res.status(201).json({ review: result.rows[0] });
    } catch (error) {
        console.log('Error adding review:', error);
        res.status(500).send('Error adding review');
    }
}

// Update a review for a movie
const updateReview = async (req, res, next) => {
    const { id: review_id } = req.params;
    const { review_text, rating } = req.body;
    const user_id = req.user.user_id;

    try {
        const query = `
            UPDATE reviews
            SET review_text = $1, rating = $2
            WHERE id = $3 AND user_id = $4
            RETURNING *
        `;
        const result = await pool.query(query, [review_text, rating, review_id, user_id]);

        if (result.rowCount === 0) {
            return res.status(400).json({ message: 'Review not found or you do not have permission to update this review' });
        }
        res.status(200).json({ review: result.rows[0] });
    } catch (error) {
        next(error);
    }
}

// Delete a review for a movie
const deleteReview = async (req, res, next) => {
    const { id: review_id } = req.params;
    const user_id = req.user.user_id;

    try {
        const query = `
            DELETE FROM reviews
            WHERE id = $1 AND user_id = $2
            RETURNING *
        `;
        const result = await pool.query(query, [review_id, user_id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Review not found or you do not have permission to delete this review' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.log('Error deleting review:', error.message);
        next(new ApiError('Error deleting review', 500));
    }
}

// Get all reviews for a movie
const getMovieReviews = async (req, res, next) => {
    const { id: movie_id } = req.params;

    try {
        const query = `
            SELECT reviews.*, users.username
            FROM reviews
            INNER JOIN users ON reviews.user_id = users.id
            WHERE movie_id = $1
            ORDER BY reviews.created_at DESC
        `;
        const result = await pool.query(query, [movie_id]);

        // Always return reviews as an array
        res.status(200).json({ reviews: result.rows });
    } catch (error) {
        console.log('Error getting reviews:', error.message);
        next(new ApiError('Error getting reviews', 500));
    }
}

const getUserReviews = async (req, res) => {
    const { id: user_id } = req.params;

    try {
        const query = `
            SELECT reviews.*, movies.title
            FROM reviews
            WHERE user_id = $1
            ORDER BY reviews.created_at DESC
        `;
        const result = await pool.query(query, [user_id]);
        res.status(200).json({ reviews: result.rows });
    } catch (error) {
        console.log('Error getting user reviews:', error.message);
        res.status(500).json({ message: 'Error getting user reviews' });
    }
}

// Fetch all reviews with movie title
const getAllReviews = async (req, res, next) => {
    try {
        const { title } = req.query; // Get the title from the query string

        let query = `
            SELECT reviews.review_id, reviews.movie_id, reviews.movie_title, reviews.review_text, reviews.rating, reviews.created_at, users.username
            FROM reviews
            INNER JOIN users ON reviews.user_id = users.user_id
        `;
        const values = [];

        // If a title is provided, filter by title
        if (title) {
            query += ` WHERE LOWER(reviews.movie_title) LIKE LOWER($1)`;
            values.push(`%${title}%`);
        }
        query += ' ORDER BY reviews.created_at DESC';
        const result = await pool.query(query, values);
        res.status(200).json({ reviews: result.rows });
    } catch (error) {
        console.log('Error getting reviews:', error.message);
        next(new ApiError('Error getting reviews', 500));
    }
}

export { addReview, updateReview, deleteReview, getMovieReviews, getUserReviews, getAllReviews };