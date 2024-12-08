import Group from '../models/GroupCreate.js';
import { ApiError } from '../helpers/ApiError1.js';


export const createGroup = async (req, res, next) => {
    const { name, description } = req.body;
    // const decoded = jwt.verify(token, process.env.TMDB_ACCESS_TOKEN);
    // const userId = decoded.id;

    // Check if the user is authenticated
    if (!req.user || !req.user.id) {
        return next(new ApiError('User not authenticated', 401));
    }

    const ownerId = req.user.id;

    if (!name || !description) {
        return next(new ApiError('Name and description are required', 400));
    }

    try {
        const group = await Group.create({ name, description, ownerId });
        res.status(201).json(group); // Send back created group details
    } catch (error) {
        console.error('Error creating group:', error);
        return next(new ApiError('Error creating group', 500));
    }
};
