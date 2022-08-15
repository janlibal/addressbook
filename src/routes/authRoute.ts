import express from 'express'
import { registerHandler, loginHandler } from '../controllers/authController'
import { validate } from '../middleware/validate'
import { createUserSchema, loginUserSchema } from '../schemas/userSchema'

const router = express.Router()

router.post('/register', validate(createUserSchema), registerHandler)
router.post('/login', validate(loginUserSchema), loginHandler)

export default router
