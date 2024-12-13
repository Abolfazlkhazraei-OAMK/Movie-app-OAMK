import { selectUserByEmail, removeUserByEmail, updateUserByEmail } from '../models/ProfileModel.js'; // Updated imports
import { ApiError } from '../helpers/ApiError1.js';
import jwt from 'jsonwebtoken';

// Function to get user profile
const getUserProfile = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized access. Token missing or invalid.' });
        }

        const token = authHeader.split(' ')[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ error: 'Invalid token. Please log in again.' });
        }

        const userEmail = decoded; // Email is the payload of the token
        console.log("Email from token:", userEmail);

        const userFromDb = await selectUserByEmail(userEmail);
        if (userFromDb.rowCount === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const user = userFromDb.rows[0];
        return res.status(200).json({
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
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized access. Token missing or invalid.' });
        }

        const token = authHeader.split(' ')[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ error: 'Invalid token. Please log in again.' });
        }

        const userEmail = decoded; // Email is the payload of the token
        console.log("Deleting user with email:", userEmail);

        const result = await removeUserByEmail(userEmail);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        return res.status(200).json({ message: 'User successfully deleted.' });
    } catch (error) {
        console.error('Error in deleteUser:', error.message);
        next(error);
    }
};

// Function to update the current user's profile
const updateUserProfile = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized access. Token missing or invalid.' });
        }

        const token = authHeader.split(' ')[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ error: 'Invalid token. Please log in again.' });
        }

        const userEmail = decoded; // Email is the payload of the token
        const { firstname, lastname } = req.body;

        if (!firstname || !lastname) {
            return res.status(400).json({ error: 'Firstname and lastname are required.' });
        }

        console.log('Updating user:', userEmail, 'Payload:', req.body);

        const updatedUser = await updateUserByEmail(userEmail, firstname, lastname);
        if (updatedUser.rowCount === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const user = updatedUser.rows[0];
        return res.status(200).json({
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            createdAt: user.created_at,
        });
    } catch (error) {
        console.error('Error in updateUserProfile:', error.message);
        next(error);
    }
};

export { getUserProfile, deleteUser, updateUserProfile };
