import { Router } from 'express'
import { getUsuariosController, getUsuarioController, createUsuarioController, updateUsuarioController, deleteUsuarioController } from '../controllers/usuarios'
import { verifyToken } from '../middleware/validate-token'

export const usuariosRouter = Router()
    .get('/', verifyToken, getUsuariosController)
    .get('/:id', verifyToken, getUsuarioController)
    .post('/', createUsuarioController)
    .patch('/', verifyToken, updateUsuarioController)
    .delete('/:id', verifyToken, deleteUsuarioController)