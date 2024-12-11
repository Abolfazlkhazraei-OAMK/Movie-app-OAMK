import { ApiError } from "../helpers/ApiError1.js"
import { emptyOrRows } from "../helpers/utils.js"
import { selectMessages, insertMessage } from "../models/Messages.js"

const getMessages = async(req,res,next) => {
    try {
        const result = await selectMessages(req.params.groupId)
        return res.status(200).json(emptyOrRows(result))

    } catch (error) {
        return next(error)
    }
}

const postMessage = async(req,res,next) => {
    try {
        if(!req.body.message || req.body.message.length === 0) {
            const error = new ApiError("Message length can't be 0", 400)
            return next(error)
        }

        const timestamp = new Date()
        const result = await insertMessage(req.params.groupId, req.body.userId, req.body.message, timestamp)
        
        return res.status(200).json(result.rows[0])
    } catch (error) {
        return next(error)
    }
}

export { getMessages, postMessage }