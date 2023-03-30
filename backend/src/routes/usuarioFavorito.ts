import { Router } from 'express'
import { getUsuarioFavoritoController, createUsuarioFavoritoController, updateUsuarioFavoritoController, deleteUsuarioFavoritoController } from '../controllers/usuarioFavorito'
import { verifyToken } from "../middleware/validate-token"

export const usuarioFavoritosRouter = Router()
    .get('/', getUsuarioFavoritoController)
    .post('/', createUsuarioFavoritoController)
    .patch('/:id', verifyToken, updateUsuarioFavoritoController)
    .delete('/:id', deleteUsuarioFavoritoController)