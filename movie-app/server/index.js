import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import {router as userRouter} from './routers/userRouter.js'
import { favoriteRouter } from "./routers/favoriteRouter.js"
import { usersRouter } from "./routers/usersRouter.js"
import GroupCreate from "./routers/groupRoutes.js"
import movieRoutes from "./routers/movieRoutes.js"
import reviewRoutes from "./routers/reviewRoutes.js"
import favoritesRoutes from "./routers/favoritesRoutes.js"
import { router as profileRouter } from './routers/profileRouter.js';
import { messageRouter } from "./routers/messageRouter.js"

dotenv.config()
// **Import Profile Router**

const port = 3001
// console.log("port", port);

const app = express()
app.use(cors())
app.use(bodyParser.json())

// User routes
app.use('/api/user', userRouter)
app.use('/users', usersRouter)
app.use('/favourites', favoriteRouter)
// Group routes
app.use('/api/group', GroupCreate)
app.use(messageRouter)
// Movies routes
app.use('/api', movieRoutes)
// Reviews routes
app.use('/api/reviews', reviewRoutes)
// Favorites routes
app.use('/api/favorites', favoritesRoutes)


// **Register Profile Router**
app.use('/profile', profileRouter);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({error: err.message})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})