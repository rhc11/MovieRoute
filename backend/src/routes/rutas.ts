import { Router } from 'express'
import { getRutasController, getRutaController, createRutaController, updateRutaController, deleteRutaController } from '../controllers/rutas'
import { verifyToken } from "../middleware/validate-token"

export const rutasRouter = Router()
    .get('/', getRutasController)
    .get('/:id', getRutaController)
    .post('/', verifyToken, createRutaController)
    .patch('/:id', verifyToken, updateRutaController)
    .delete('/:id', verifyToken, deleteRutaController)