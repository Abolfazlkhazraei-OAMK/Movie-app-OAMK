import { Router } from "express";
import { getMessages, postMessage } from "../controllers/MessageController.js";
import { auth } from "../helpers/auth.js";


const messageRouter = Router()

messageRouter.get('/messages/:groupId',(req,res,next) => {
    getMessages(req,res,next)
})
messageRouter.post('/messages/:groupId/post',auth,(req,res,next) => {
    postMessage(req,res,next)
})

export {messageRouter}