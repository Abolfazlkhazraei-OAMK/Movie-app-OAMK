import express from 'express';
import { createGroup } from '../controllers/GroupController.js';
import { auth } from '../helpers/auth.js';

const router = express.Router();

router.post('/create', auth, createGroup);


export default router