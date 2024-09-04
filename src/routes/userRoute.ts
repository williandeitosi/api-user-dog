import { Router } from 'express'
import { createUser , deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController'

const router = Router()

router.get('/', getAllUsers)
router.get('/user/:id', getUser)
router.post('/newuser', createUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export { router as userRoutes }
