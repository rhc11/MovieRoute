import { Router } from 'express'
import { getParadasController, getParadaController, createParadaController, updateParadaController, deleteParadaController } from '../controllers/paradas'
import { verifyToken } from "../middleware/validate-token"

export const paradasRouter = Router()
    .get('/', getParadasController)
    .get('/:id', getParadaController)
    .post('/', verifyToken, createParadaController)
    .patch('/:id', verifyToken, updateParadaController)
    .delete('/:id', verifyToken, deleteParadaController)