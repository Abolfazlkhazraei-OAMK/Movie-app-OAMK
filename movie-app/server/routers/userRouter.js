import { Router } from 'express'
import { postLogin, postRegistration } from '../controllers/UserController.js'

const router = Router()

router.post('/register', postRegistration)
router.post('/login', postLogin)

export { router}