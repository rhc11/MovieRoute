import { Router } from 'express'
import { getUsuarioFavoritosController, getUsuarioFavoritoController, createUsuarioFavoritoController, updateUsuarioFavoritoController, deleteUsuarioFavoritoController } from '../controllers/usuarioFavorito'
import { verifyToken } from "../middleware/validate-token"

export const usuarioFavoritosRouter = Router()
    .get('/', getUsuarioFavoritosController)
    .get('/:id', getUsuarioFavoritoController)
    .post('/', verifyToken, createUsuarioFavoritoController)
    .patch('/:id', verifyToken, updateUsuarioFavoritoController)
    .delete('/:id', verifyToken, deleteUsuarioFavoritoController)