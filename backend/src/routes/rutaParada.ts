import { Router } from 'express'
import { getRutaParadasController, getRutaParadaController, createRutaParadaController, updateRutaParadaController, deleteRutaParadaController } from '../controllers/rutaParada'
import { verifyToken } from "../middleware/validate-token"

export const rutaParadasRouter = Router()
    .get('/', getRutaParadasController)
    .get('/:id', getRutaParadaController)
    .post('/', verifyToken, createRutaParadaController)
    .patch('/:id', verifyToken, updateRutaParadaController)
    .delete('/:id', verifyToken, deleteRutaParadaController)