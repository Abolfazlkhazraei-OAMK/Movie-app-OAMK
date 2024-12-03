import { Router } from "express";
import { getAllUsers } from "../models/Users.js";
import { emptyOrRows } from "../helpers/utils.js";

const usersRouter = Router()

usersRouter.get('/', async (req,res,next) => {
    try {
        const result = await getAllUsers()
        return res.status(200).json(emptyOrRows(result))
    } catch (error) {
        next(error)
    }
})

export { usersRouter }