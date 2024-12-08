import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import pool from "./helpers/db.js"
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
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// User routes
app.use('/user', userRouter)
// Group routes
app.use('/group', GroupCreate)
// Movies routes
app.use('/movies', movieRoutes)
// Reviews routes
app.use('/reviews', reviewRoutes)
// Favorites routes
app.use('/favorites', favoritesRoutes)

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({error: err.message})
})

// Test the connection to the database
(async () => {
    try {
        await pool.query("SELECT NOW()")
        console.log("Connected to the database")
    } catch (error) {
        console.error("Error connecting to the database:", error)
        process.exit(1)
    }
})();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})