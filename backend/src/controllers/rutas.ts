import { Handler, RequestHandler } from "express"
import {
  getRutas,
  getRuta,
  createRuta,
  updateRuta,
  deleteRuta,
} from "../core/rutas"
import { RutaModelInput } from "../models/rutas"

export const getRutasController: Handler = async (req, res) => {
  const skip = Number(req.query.skip) || 0
  const search = req.query.search?.toString() || ''
  const userEmail = req.query.userEmail?.toString() || ''
  const onlyFavs = Boolean(req.query.onlyFavs)
  const onlyUser = Boolean(req.query.onlyUser)

  const response = await getRutas(skip, search, userEmail, onlyFavs, onlyUser)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const getRutaController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const userEmail = req.query.userEmail?.toString() || ''
  
  const response = await getRuta(req.params.id, userEmail)

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
