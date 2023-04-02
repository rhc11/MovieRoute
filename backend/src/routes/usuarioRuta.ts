import { Router } from 'express'
import { getUsuarioRutasController, getUsuarioRutaController, createUsuarioRutaController, updateUsuarioRutaController, deleteUsuarioRutaController } from '../controllers/usuarioRuta'
import { verifyToken } from "../middleware/validate-token"

export const usuarioRutasRouter = Router()
    .get('/', getUsuarioRutasController)
    .get('/:id', getUsuarioRutaController)
    .post('/', verifyToken, createUsuarioRutaController)
    .patch('/', verifyToken, updateUsuarioRutaController)
    .delete('/:id', verifyToken, deleteUsuarioRutaController)