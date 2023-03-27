import { Handler, RequestHandler } from "express"
import {
  getNotificaciones,
  getNotificacion,
  createNotificacion,
  updateNotificacion,
  deleteNotificacion,
} from "../core/notificaciones"
import { NotificacionModelInput } from "../models/notificaciones"

export const getNotificacionesController: Handler = async (_req, res) => {
  const response = await getNotificaciones()

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const getNotificacionController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await getNotificacion(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const createNotificacionController: Handler = async (req, res) => {
  const validatedBody = NotificacionModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await createNotificacion(validatedBody.data)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const updateNotificacionController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const validatedBody = NotificacionModelInput.safeParse(req.body)

  if (!validatedBody.success) {
    return res.status(400).send(validatedBody.error.issues)
  }

  const response = await updateNotificacion(validatedBody.data, req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}

export const deleteNotificacionController: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const response = await deleteNotificacion(req.params.id)

  if (!response) {
    return res.status(404).send()
  }

  return res.status(200).json(response)
}
