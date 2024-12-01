import { ApiError } from "../helpers/ApiError1"
import { emptyOrRows } from "../helpers/utils"
import { selectMessages, insertMessage } from "../models/messages"

const getMessages = async(req,res,next) => {
    try {
        const result = await selectMessages()
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

        const message = await insertMessage(req.body.message)
        
        return res.status(200).json({message: message})
    } catch (error) {
        return next(error)
    }
}

export {getMessages,postMessage}