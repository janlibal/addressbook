import express from 'express'
import { deserializeUser } from '../middleware/deserizalizeUser'
import { addressHandler } from '../controllers/addressController'
import { requireUser } from '../middleware/requireUser'
import { validate } from '../middleware/validate'
import { createAddressSchema } from '../schemas/addressSchema'

const router = express.Router()
router.use(deserializeUser, requireUser)

router.post('/new', validate(createAddressSchema), addressHandler)

export default router
