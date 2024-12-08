import pool from '../helpers/db.js';

// Fetch user by ID
const selectUserById = async (id) => {
    return await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
};

// Remove user by ID
const removeUserById = async (id) => {
    return await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
};

// Update user's first and last name by ID
const updateUserById = async (id, firstname, lastname) => {
    return await pool.query(
        'UPDATE users SET firstname = $1, lastname = $2 WHERE user_id = $3 RETURNING *',
        [firstname, lastname, id]
    );
};

export { selectUserById, removeUserById, updateUserById };
