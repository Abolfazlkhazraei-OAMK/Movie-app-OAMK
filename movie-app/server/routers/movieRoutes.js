import express from 'express';
import { getGenres, getMovies, getMovieDetails } from '../controllers/MovieController.js';

const router = express.Router();

router.get('/genres', getGenres);
router.get('/movies', getMovies);
router.get('/movies/:id', getMovieDetails);

export default router;