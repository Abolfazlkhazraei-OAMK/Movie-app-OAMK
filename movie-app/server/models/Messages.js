import pool from "../db.js";

const insertMessage = async (message) => {
    return await pool.query('insert into groups (message) values ($1) returning *', [message])
}

const selectMessages = async () => {
    return await pool.query('select message from groups')
}

export { insertMessage, selectMessages}