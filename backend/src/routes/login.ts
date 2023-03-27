import { Router } from 'express'
import { loginController } from '../controllers/login'

export const loginRouter = Router()
    .post('/', loginController)
