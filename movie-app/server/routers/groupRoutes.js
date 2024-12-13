import express from 'express';
import { 
  createGroup,
  getAllGroups,
  getGroupById,
  deleteGroup,
  addJoinRequest,
  getJoinRequests,
  handleJoinRequest,
  removeMember,
  getUserGroups,
  checkMembership,
  getGroupMembers 
} from '../controllers/GroupController.js';
import { authenticate } from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Create a new group
router.post('/create', authenticate, createGroup); // createGroup (POST to '/groups')

// Get all groups with optional pagination
router.get('/getAll', authenticate, getAllGroups); // getAllGroups (GET to '/groups')

// Get details of a specific group by ID
router.get('/:groupId', authenticate, getGroupById); // getGroupById (GET to '/groups/:groupId')

// Delete a group by ID
router.delete('/:groupId', authenticate, deleteGroup); // deleteGroup (DELETE to '/groups/:groupId')

// Send a join request to a group
router.post('/:groupId/join', authenticate, addJoinRequest); // addJoinRequest (POST to '/groups/:groupId/join')

// Fetch join requests for a group
router.get('/:groupId/join-requests', authenticate, getJoinRequests); // getJoinRequests (GET to '/groups/:groupId/join-requests')

// Handle a join request (accept/reject)
router.put('/join-requests/:requestId', authenticate, handleJoinRequest); // handleJoinRequest (PUT to '/groups/join-requests/:requestId')

// Remove a member from a group
router.delete('/:groupId/members/:userId', authenticate, removeMember); // removeMember (DELETE to '/groups/:groupId/members/:userId')

// Get groups the user is a part of
router.get('/users/groups', authenticate, getUserGroups); // getUserGroups (GET to '/users/groups')

// Check if the user is a member of a group
router.get('/:groupId/is-member', authenticate, checkMembership); // checkMembership (GET to '/groups/:groupId/is-member')

// Fetch members of a group
router.get('/:groupId/members', authenticate, getGroupMembers); // getGroupMembers (GET to '/groups/:groupId/members')

export default router;    