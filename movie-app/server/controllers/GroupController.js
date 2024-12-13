import Group from '../models/GroupModel.js';

// Create a new group and add the creator as a member
export const createGroup = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.userId; // Assuming userId is available via req.use

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
        }

        const groupId = await Group.createGroup(name, description, userId);
        res.status(201).json({ message: 'Group created successfully', groupId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all groups with optional pagination
export const getAllGroups = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 500;
        const offset = parseInt(req.query.offset) || 0;

        const groups = await Group.getAllGroups(limit, offset);
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get details of a specific group by ID
export const getGroupById = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.getGroupById(groupId);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a group by ID
export const deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.user.userId; // Using authenticated userId

        const group = await Group.getGroupById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        // Check if the user is the owner of the group
        if (group.owner_id !== userId) {
            return res.status(403).json({ error: 'Only the group owner can delete the group' });
        }

        const deletedGroup = await Group.deleteGroup(groupId);

        res.status(200).json({ message: 'Group deleted successfully', deletedGroup });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Send a join request
export const addJoinRequest = async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.user.userId; // Using authenticated userId

        // Check if the group exists
        const group = await Group.getGroupById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if the user is already a member of the group
        const isMember = await Group.isUserMember(groupId, userId);
        if (isMember) {
            return res.status(400).json({ error: 'User is already a member of this group' });
        }

        // Check if the user has already sent a join request and add it
        const joinRequest = await Group.addJoinRequest(groupId, userId);
        res.status(201).json({ message: 'Join request sent', joinRequest });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch join requests for a group
export const getJoinRequests = async (req, res) => {
    try {
        const { groupId } = req.params; 
        const joinRequests = await Group.getJoinRequests(groupId);
        res.status(200).json(joinRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Handle join request (accept/reject)
export const handleJoinRequest = async (req, res) => {
    try {
        const { requestId } = req.params; // Extract requestId from route params
        const { status } = req.body; // Extract status from the request body
        // Validate status
        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status. Must be "accepted" or "rejected".' });
        }

        // Update the join request status
        const updatedRequest = await Group.acceptJoinRequest(requestId, status);

        if (!updatedRequest) {
            return res.status(404).json({ error: 'Join request not found' });
        }

        res.status(200).json({ message: `Join request ${status}`, updatedRequest });
    } catch (error) {
        console.error('Error handling join request:', error);
        res.status(500).json({ error: error.message });
    }
};

// Remove a member from a group
export const removeMember = async (req, res) => {
    try {
        const { groupId, userId } = req.params;
        const ownerId = req.user.userId; // Using authenticated adminId

        const removedMember = await Group.removeMember(groupId, userId);
        if (!removedMember) {
            return res.status(404).json({ error: 'Member not found in this group' });
        }

        res.status(200).json({ message: 'Member removed successfully', removedMember });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get groups the user is a part of
export const getUserGroups = async (req, res) => {
    try {
        const userId = req.user.userId; // Using authenticated userId

        const groups = await Group.getUserGroups(userId);
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Check if the user is a member of a group
export const checkMembership = async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.user.userId; // Using authenticated userId
        const isMember = await Group.isUserMember(groupId, userId);
        res.status(200).json({ isMember });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch members of a group
export const getGroupMembers = async (req, res) => {
    try {
        const { groupId } = req.params;
        const members = await Group.getGroupMembers(groupId);

        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
