import { Handler, RequestHandler } from "express"
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../core/usuarios"
import { UsuarioModelInput } from "../models/usuarios"

export const getUsuariosController: Handler = async (_req, res) => {
  const response = await getUsuarios()

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const getUsuarioController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await getUsuario(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const createUsuarioController: Handler = async (req, res) => {
  const validatedBody = UsuarioModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await createUsuario(validatedBody.data)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const updateUsuarioController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const validatedBody = UsuarioModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await updateUsuario(validatedBody.data, req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const deleteUsuarioController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await deleteUsuario(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}
