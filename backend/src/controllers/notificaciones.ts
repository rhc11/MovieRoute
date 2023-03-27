import { Handler, RequestHandler } from "express"
import {
  getParadas,
  getParada,
  createParada,
  updateParada,
  deleteParada,
} from "../core/paradas"
import { ParadaModelInput } from "../models/paradas"

export const getParadasController: Handler = async (_req, res) => {
  const response = await getParadas()

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const getParadaController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await getParada(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const createParadaController: Handler = async (req, res) => {
  const validatedBody = ParadaModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await createParada(validatedBody.data)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const updateParadaController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const validatedBody = ParadaModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await updateParada(validatedBody.data, req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const deleteParadaController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await deleteParada(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}
