import express from 'express';
import { addReview, updateReview, deleteReview, getMovieReviews, getUserReviews, getAllReviews } from '../controllers/ReviewController.js';
import { authenticate } from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Add a review
router.post('/add', authenticate, addReview);

// Update a review
router.put('/:id', authenticate, updateReview);

// Delete a review
router.delete('/:id', authenticate, deleteReview);

// Get all reviews for a movie
router.get('/movie/:id', getMovieReviews);

// Get all reviews for the current user
router.get('/', authenticate, getUserReviews);

// Get all reviews
router.get('/all', authenticate, getAllReviews);

export default router;