import pool from "../helpers/db.js";

class Group {
    // Create a new group and return the group_id
    static async createGroup(name, description, ownerId) {
        try {
            const query = `
                INSERT INTO Groups (name, description, owner_id)
                VALUES ($1, $2, $3)
                RETURNING group_id;
            `;
            const result = await pool.query(query, [name, description, ownerId]);
            return result.rows[0].group_id; // Return the group_id of the newly created group
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Get all groups with pagination
    static async getAllGroups(limit, offset) {
        try {
            const query = `
                SELECT * FROM Groups
                LIMIT $1 OFFSET $2;
            `;
            const result = await pool.query(query, [limit, offset]);
            return result.rows; // Return an array of groups
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Get a group by its ID
    static async getGroupById(groupId) {
        try {
            const query = `
                SELECT * FROM Groups
                WHERE group_id = $1;
            `;
            const result = await pool.query(query, [groupId]);
            return result.rows[0]; // Return the group details
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Delete a group by its ID
    static async deleteGroup(groupId) {
        try {
            const query = `
                DELETE FROM Groups
                WHERE group_id = $1
                RETURNING *;
            `;
            const result = await pool.query(query, [groupId]);
            return result.rows[0]; // Return the deleted group details
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Check if a user is a member of a group
    static async isUserMember(groupId, userId) {
        try {
            const query = `
                SELECT 1 FROM GroupMembers
                WHERE group_id = $1 AND user_id = $2;
            `;
            const result = await pool.query(query, [groupId, userId]);
            return result.rowCount > 0; // Return true if the user is a member
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Check if a user has sent a join request to a group
    static async hasUserRequested(groupId, userId) {
        try {
            const query = `
                SELECT 1 FROM join_requests
                WHERE group_id = $1 AND user_id = $2;
            `;
            const result = await pool.query(query, [groupId, userId]);
            return result.rowCount > 0; // Return true if the user has sent a join request
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Add a join request for a user to a group
    static async addJoinRequest(groupId, userId) {
        try {
            // First get user information
            const userQuery = `
                SELECT firstName, lastName, email 
                FROM Users 
                WHERE user_id = $1;
            `;
            const userResult = await pool.query(userQuery, [userId]);
            const user = userResult.rows[0];

            // Then create the join request with user information
            const query = `
                INSERT INTO join_requests (group_id, user_id, status, first_name, last_name, email)
                VALUES ($1, $2, 'pending', $3, $4, $5)
                RETURNING *;
            `;
            const result = await pool.query(query, [
                groupId, 
                userId, 
                user.firstname,
                user.lastname,
                user.email
            ]);
            return result.rows[0]; // Return the new join request
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Get join requests for a group
    static async getJoinRequests(groupId) {
        try {
            const query = `
                SELECT * FROM join_requests
                WHERE group_id = $1;
            `;
            const result = await pool.query(query, [groupId]);
            return result.rows; // Return the join requests
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async acceptJoinRequest(requestId, status) {
        try {
          const validStatus = status === 'accepted' ? 'approved' : 'rejected';
          const query = `
            UPDATE join_requests
            SET status = $1
            WHERE group_request_id = $2
            RETURNING *;
          `;
          const result = await pool.query(query, [validStatus, requestId]);
      
          if (result.rows.length === 0) {
            return null; // No rows updated, join request not found
          }
      
          return result.rows[0]; // Return the updated join request
        } catch (error) {
          console.error('Error in acceptJoinRequest:', error.message);
          throw new Error(error.message);
        }
      }
      


    // Remove a member from a group
    static async removeMember(groupId, userId) {
        try {
            const query = `
                DELETE FROM GroupMembers
                WHERE group_id = $1 AND user_id = $2
                RETURNING *;
            `;
            const result = await pool.query(query, [groupId, userId]);
            return result.rows[0]; // Return the removed member's details
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Get all members of a group
    static async getGroupMembers(groupId) {
        try {
            const query = `
                SELECT u.user_id, u.firstName, u.lastName, gm.is_owner, gm.status,gm.email
                FROM GroupMembers gm
                JOIN Users u ON gm.user_id = u.user_id
                WHERE gm.group_id = $1;
            `;
            const result = await pool.query(query, [groupId]);
            return result.rows; // Return an array of group members
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Get groups that a user is a part of
    static async getUserGroups(userId) {
        try {
            const query = `
                SELECT g.group_id, g.name, g.description
                FROM Groups g
                JOIN GroupMembers gm ON g.group_id = gm.group_id
                WHERE gm.user_id = $1;
            `;
            const result = await pool.query(query, [userId]);
            return result.rows; // Return an array of groups the user is part of
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default Group;
