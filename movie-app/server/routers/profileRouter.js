import { Router } from 'express';
import { getUserProfile, deleteUser, updateUserProfile } from '../controllers/ProfileController.js';

const router = Router();

// Route to get the current user's profile
router.get('/', getUserProfile);

// PUT route to update the current user's profile
router.put('/', updateUserProfile);

// DELETE route to remove the current user
router.delete('/', deleteUser);

export { router };
