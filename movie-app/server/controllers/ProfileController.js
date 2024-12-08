import { selectUserById, removeUserById, updateUserById  } from '../models/ProfileModel.js'; // Add removeUserById import
import { ApiError } from '../helpers/ApiError1.js';
import jwt from 'jsonwebtoken';

// Function to get user profile
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

// Function to delete the current user
const deleteUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if the authorization header exists and is properly formatted
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized access. Token missing or invalid.' });
        }

        // Extract the token from the authorization header
        const token = authHeader.split(' ')[1];

        let decoded;
        try {
            // Verify and decode the token
            decoded = jwt.verify(token, process.env.TMDB_ACCESS_TOKEN);
        } catch (err) {
            console.error("Token verification failed:", err.message);
            return res.status(401).json({ error: 'Invalid token. Please log in again.' });
        }

        const userId = decoded.id; // Extract the user ID from the token payload
        if (!userId) {
            return res.status(401).json({ error: 'Token does not contain user ID.' });
        }

        console.log("Deleting User ID:", userId); // Log the user ID being deleted

        // Delete the user from the database
        const result = await removeUserById(userId);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Return a success response
        return res.status(200).json({ message: 'User successfully deleted.' });
    } catch (error) {
        console.error('Error in deleteUser:', error.message);
        next(error);
    }
};


// Update current user's profile
const updateUserProfile = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized access. Token missing or invalid.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TMDB_ACCESS_TOKEN);
        const userId = decoded.id;

        const { firstname, lastname } = req.body;

        // Log the incoming payload and user ID
        console.log('Updating user:', userId, 'Payload:', req.body);

        if (!firstname || !lastname) {
            return res.status(400).json({ error: 'Firstname and lastname are required.' });
        }

        const updatedUser = await updateUserById(userId, firstname, lastname);

        if (updatedUser.rowCount === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const user = updatedUser.rows[0];
        return res.status(200).json({
            id: user.user_id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            createdAt: user.created_at,
        });
    } catch (error) {
        console.error('Error in updateUserProfile:', error.message); // Log the error
        next(error);
    }
};





export { getUserProfile, deleteUser, updateUserProfile };
