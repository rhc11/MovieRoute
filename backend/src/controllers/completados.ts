import { Handler, RequestHandler } from "express"
import {
  getCompletados,
  getCompletado,
  createCompletado,
  updateCompletado,
  deleteCompletado,
} from "../core/completados"
import { CompletadoModelInput } from "../models/completados"

export const getCompletadosController: Handler = async (_req, res) => {
  const response = await getCompletados()

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const getCompletadoController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await getCompletado(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const createCompletadoController: Handler = async (req, res) => {
  const validatedBody = CompletadoModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await createCompletado(validatedBody.data)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const updateCompletadoController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const validatedBody = CompletadoModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await updateCompletado(validatedBody.data, req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const deleteCompletadoController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await deleteCompletado(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}
