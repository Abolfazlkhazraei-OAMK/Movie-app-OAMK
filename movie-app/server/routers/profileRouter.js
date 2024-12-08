import { Router } from 'express';
import { getUserProfile, deleteUser } from '../controllers/ProfileController.js';

const router = Router();

// Route to get the current user's profile
router.get('/', getUserProfile);

// DELETE route to remove the current user
router.delete('/', deleteUser); // No authenticateToken middleware

export { router };
