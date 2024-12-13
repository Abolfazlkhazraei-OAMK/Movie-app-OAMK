import pool from "../helpers/db.js";

const insertMessage = async (groupId, userId, messageContent, messageTimestamp) => {
    return await pool.query('insert into GroupMessages (group_id, user_id, message_content, message_timestamp) values ($1,$2,$3,$4) returning *', [groupId, userId, messageContent, messageTimestamp])
}

const selectMessages = async (groupId) => {
    return await pool.query('select * from GroupMessages where group_id = $1', [groupId])
}

export { insertMessage, selectMessages }