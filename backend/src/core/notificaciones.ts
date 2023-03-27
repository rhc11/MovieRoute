import { PrismaClient } from "@prisma/client"
import { NotificacionModelInput } from "../models/notificaciones"

const prisma = new PrismaClient()

export const getNotificaciones = async () => {
  try {
    const notificaciones = await prisma.notificacion.findMany()

    return notificaciones
  } catch (error) {
    throw error
  }
}

export const getNotificacion = async (id: string) => {
  try {
    const notificacion = await prisma.notificacion.findUnique({
      where: {
        id,
      },
    })

    return notificacion
  } catch (error) {
    throw error
  }
}

export const createNotificacion = async (notificacionInput: NotificacionModelInput) => {
  try {
    const notificacion = await prisma.notificacion.create({
      data: notificacionInput
    })

    return notificacion
  } catch (error) {
    throw error
  }
}

export const updateNotificacion = async (notificacion: NotificacionModelInput, id: string) => {
  try {
    const notificacionUpdated = await prisma.notificacion.update({
      where: {
        id
      },
      data: notificacion
    })

    return notificacionUpdated
  } catch (error) {
    throw error
  }
}

export const deleteNotificacion = async (id: string) => {
  try {
    const notificacion = await prisma.notificacion.delete({
      where: {
        id,
      },
    })

    return notificacion
  } catch (error) {
    throw error
  }
}