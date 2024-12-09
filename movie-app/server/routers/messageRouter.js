import { Router } from "express";
import { getMessages, postMessage } from "../controllers/MessageController";
import { auth } from "../helpers/auth";


const messageRouter = Router()

messageRouter.get('/messages',(req,res,next) => {
    getMessages(req,res,next)
})
messageRouter.post('/messages/post',auth,(req,res,next) => {
    postMessage(req,res,next)
})

export {messageRouter}