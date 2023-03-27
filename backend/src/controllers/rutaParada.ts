import { Handler, RequestHandler } from "express"
import {
  getRutaParadas,
  getRutaParada,
  createRutaParada,
  updateRutaParada,
  deleteRutaParada,
} from "../core/rutaParada"
import { RutaParadaModelInput } from "../models/rutaParada"

export const getRutaParadasController: Handler = async (_req, res) => {
  const response = await getRutaParadas()

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const getRutaParadaController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await getRutaParada(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const createRutaParadaController: Handler = async (req, res) => {
  const validatedBody = RutaParadaModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await createRutaParada(validatedBody.data)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const updateRutaParadaController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const validatedBody = RutaParadaModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await updateRutaParada(validatedBody.data, req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const deleteRutaParadaController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await deleteRutaParada(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}
