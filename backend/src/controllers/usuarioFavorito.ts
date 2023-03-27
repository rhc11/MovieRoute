import { Handler, RequestHandler } from "express"
import {
  getUsuarioFavoritos,
  getUsuarioFavorito,
  createUsuarioFavorito,
  updateUsuarioFavorito,
  deleteUsuarioFavorito,
} from "../core/usuarioFavorito"
import { UsuarioFavoritoModelInput } from "../models/usuarioFavorito"

export const getUsuarioFavoritosController: Handler = async (_req, res) => {
  const response = await getUsuarioFavoritos()

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const getUsuarioFavoritoController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await getUsuarioFavorito(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const createUsuarioFavoritoController: Handler = async (req, res) => {
  const validatedBody = UsuarioFavoritoModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await createUsuarioFavorito(validatedBody.data)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const updateUsuarioFavoritoController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const validatedBody = UsuarioFavoritoModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await updateUsuarioFavorito(validatedBody.data, req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const deleteUsuarioFavoritoController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await deleteUsuarioFavorito(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}
