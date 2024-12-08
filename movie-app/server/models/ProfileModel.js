import pool from '../helpers/db.js';

const selectUserById = async (id) => {
    return await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
};

export { selectUserById };
