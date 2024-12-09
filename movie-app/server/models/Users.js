import pool from "../db.js";

const getAllUsers = async () => {
    return await pool.query('select * from users')
}

export { getAllUsers }