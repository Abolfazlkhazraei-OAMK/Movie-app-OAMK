import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import {router as userRouter} from './routers/userRouter.js'
import GroupCreate from "./routers/groupRoutes.js"

// **Import Profile Router**
import { router as profileRouter } from './routers/profileRouter.js';
import movieRoutes from "./routers/movieRoutes.js"
import reviewRoutes from "./routers/reviewRoutes.js"
import favoritesRoutes from "./routers/favoritesRoutes.js"

dotenv.config()
const port = 3001
// console.log("port", port);

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/user', userRouter)
app.use('/group', GroupCreate)

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({error: err.message})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})