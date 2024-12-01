import express from "express"
import cors from "cors"
import pkg from "pg"
import {router as userRouter} from './routers/userRouter.js'
import { favoriteRouter } from "./routers/favoriteRouter.js"

const port = 3001
// console.log("port", port);

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/user', userRouter)
app.use('/favourites', favoriteRouter)

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({error: err.message})
})

app.listen(port)