import { Router } from 'express'
import { createUser, getUser } from '../controllers/userController'

const router = Router()

router.get('/user/:id', getUser)
router.post('/newuser', createUser)

export { router as userRoutes }
