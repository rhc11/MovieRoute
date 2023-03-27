import { Router } from 'express'
import { getNotificacionesController, getNotificacionController, createNotificacionController, updateNotificacionController, deleteNotificacionController } from '../controllers/notificaciones'
import { verifyToken } from "../middleware/validate-token"

export const notificacionesRouter = Router()
    .get('/', getNotificacionesController)
    .get('/:id', getNotificacionController)
    .post('/', verifyToken, createNotificacionController)
    .patch('/:id', verifyToken, updateNotificacionController)
    .delete('/:id', verifyToken, deleteNotificacionController)