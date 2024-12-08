import { selectUserById } from '../models/ProfileModel.js';
import { ApiError } from '../helpers/ApiError1.js';
import jwt from 'jsonwebtoken';

const getUserProfile = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader); // Log authorization header
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized access. Token missing or invalid.' });
        }

        const token = authHeader.split(' ')[1];
        console.log("Extracted Token:", token); // Log the extracted token

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.TMDB_ACCESS_TOKEN);
            console.log("Decoded Token:", decoded); // Log decoded token
        } catch (err) {
            console.error("Token verification failed:", err.message); // Log token verification errors
            return res.status(401).json({ error: 'Invalid token. Please log in again.' });
        }

        const userId = decoded.id;
        if (!userId) {
            return res.status(401).json({ error: 'Token does not contain user ID.' });
        }

        console.log("User ID from token:", userId); // Log extracted user ID

        const userFromDb = await selectUserById(userId);
        if (userFromDb.rowCount === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const user = userFromDb.rows[0];
        return res.status(200).json({
            id: user.user_id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            createdAt: user.created_at,
        });
    } catch (error) {
        console.error('Error in getUserProfile:', error.message);
        next(error);
    }
};


export { getUserProfile };
