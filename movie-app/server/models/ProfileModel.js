import pool from '../helpers/db.js';

// Fetch user by email
const selectUserByEmail = async (email) => {
    return await pool.query('SELECT * FROM users WHERE email = $1', [email]);
};

// Remove user by email
const removeUserByEmail = async (email) => {
    return await pool.query('DELETE FROM users WHERE email = $1', [email]);
};

// Update user's first and last name by email
const updateUserByEmail = async (email, firstname, lastname) => {
    return await pool.query(
        'UPDATE users SET firstname = $1, lastname = $2 WHERE email = $3 RETURNING *',
        [firstname, lastname, email]
    );
};

export { selectUserByEmail, removeUserByEmail, updateUserByEmail };
