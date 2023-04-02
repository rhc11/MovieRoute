import { PrismaClient } from "@prisma/client"
import { CompletadoModelInput } from "../models/completados"

const prisma = new PrismaClient()

export const getCompletados = async (userEmail?: string, rutaId?: string) => {
  try {
    const completados = await prisma.completado.findMany({
      where: {
        usuarioEmail: userEmail,
        parada: {
          rutas: {
            some: {
              ruta: { id: rutaId },
            },
          },
        },
      },
    })

    return completados
  } catch (error) {
    throw error
  }
}

export const getCompletado = async (id: string) => {
  try {
    const completado = await prisma.completado.findUnique({
      where: {
        id,
      },
    })

    return completado
  } catch (error) {
    throw error
  }
}

export const createCompletado = async (completadoInput: CompletadoModelInput) => {
  try {
    const completado = await prisma.completado.create({
      data: completadoInput
    })

    return completado
  } catch (error) {
    throw error
  }
}

export const updateCompletado = async (completado: CompletadoModelInput, id: string) => {
  try {
    const completadoUpdated = await prisma.completado.update({
      where: {
        id
      },
      data: completado
    })

    return completadoUpdated
  } catch (error) {
    throw error
  }
}

export const deleteCompletado = async (id: string) => {
  try {
    const completado = await prisma.completado.delete({
      where: {
        id,
      },
    })

    return completado
  } catch (error) {
    throw error
  }
}