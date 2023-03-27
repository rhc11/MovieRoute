import { Handler, RequestHandler } from "express"
import {
  getRutas,
  getRuta,
  createRuta,
  updateRuta,
  deleteRuta,
} from "../core/rutas"
import { RutaModel, RutaModelInput } from "../models/rutas"

export const getRutasController: Handler = async (_req, res) => {
  const response = await getRutas()

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const getRutaController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await getRuta(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const createRutaController: Handler = async (req, res) => {
  const validatedBody = RutaModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await createRuta(validatedBody.data)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const updateRutaController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const validatedBody = RutaModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await updateRuta(validatedBody.data, req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const deleteRutaController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await deleteRuta(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}
