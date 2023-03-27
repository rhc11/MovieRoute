import { Router } from 'express'
import { getCompletadosController, getCompletadoController, createCompletadoController, updateCompletadoController, deleteCompletadoController } from '../controllers/completados'
import { verifyToken } from "../middleware/validate-token"

export const completadosRouter = Router()
    .get('/', getCompletadosController)
    .get('/:id', getCompletadoController)
    .post('/', verifyToken, createCompletadoController)
    .patch('/:id', verifyToken, updateCompletadoController)
    .delete('/:id', verifyToken, deleteCompletadoController)