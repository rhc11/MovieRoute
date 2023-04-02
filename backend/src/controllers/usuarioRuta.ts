import { Handler, RequestHandler } from "express"
import {
  getUsuarioRutas,
  getUsuarioRuta,
  createUsuarioRuta,
  updateUsuarioRuta,
  deleteUsuarioRuta,
} from "../core/usuarioRuta"
import { UsuarioRutaModelInput } from "../models/usuarioRuta"

export const getUsuarioRutasController: Handler = async (_req, res) => {
  const response = await getUsuarioRutas()

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const getUsuarioRutaController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await getUsuarioRuta(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const createUsuarioRutaController: Handler = async (req, res) => {
  const validatedBody = UsuarioRutaModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await createUsuarioRuta(validatedBody.data)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const updateUsuarioRutaController: Handler = async (
  req,
  res
) => {
  const validatedBody = UsuarioRutaModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await updateUsuarioRuta(validatedBody.data)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const deleteUsuarioRutaController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await deleteUsuarioRuta(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}
