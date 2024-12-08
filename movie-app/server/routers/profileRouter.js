import { Router } from 'express';
import { getUserProfile } from '../controllers/ProfileController.js';

const router = Router();

// Route to get the current user's profile
router.get('/', getUserProfile);

export { router };
