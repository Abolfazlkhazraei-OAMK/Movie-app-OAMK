import express from "express"
import cors from "cors"
import pkg from "pg"
import {router as userRouter} from './routers/userRouter.js'
import { favoriteRouter } from "./routers/favoriteRouter.js"
import { usersRouter } from "./routers/usersRouter.js"
import GroupCreate from "./routers/groupRoutes.js"

// **Import Profile Router**
import { router as profileRouter } from './routers/profileRouter.js';
import { messageRouter } from "./routers/messageRouter.js"

const port = 3001
// console.log("port", port);

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/user', userRouter)
app.use('/users', usersRouter)
app.use('/favourites', favoriteRouter)
app.use('/group', GroupCreate)
app.use(messageRouter)


// **Register Profile Router**
app.use('/profile', profileRouter);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({error: err.message})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})