import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/FavoritesController.js';
import { authenticate } from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getFavorites);
router.post('/add', authenticate, addFavorite);
router.delete('/delete', authenticate, removeFavorite);

export default router;