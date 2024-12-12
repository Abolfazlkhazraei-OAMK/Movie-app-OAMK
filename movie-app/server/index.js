import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import {router as userRouter} from './routers/userRouter.js'
import GroupCreate from "./routers/groupRoutes.js"
import movieRoutes from "./routers/movieRoutes.js"
import reviewRoutes from "./routers/reviewRoutes.js"
import favoritesRoutes from "./routers/favoritesRoutes.js"

dotenv.config()
const port = 3001
// console.log("port", port);

const app = express()
app.use(cors())
app.use(bodyParser.json())

// User routes
app.use('/api/user', userRouter)
// Group routes
app.use('/api/group', GroupCreate)
// Movies routes
app.use('/api', movieRoutes)
// Reviews routes
app.use('/api/reviews', reviewRoutes)
// Favorites routes
app.use('/api/favorites', favoritesRoutes)

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({error: err.message})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})