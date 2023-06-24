import { PrismaClient } from "@prisma/client"
import { CompletadoModelInput, CreateCompletadoModel } from "../models/completados"

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

export const createCompletado = async (completadoInput: CreateCompletadoModel) => {
  try {
    const parada = await prisma.parada.findUnique({
      where: {
        id: completadoInput.paradaId
      }
    })

    if(!parada) {
      return null
    }

    // Get latitude and longitude
    const inputLat = completadoInput.coords.latitude.toString().split(".")
    const inputLon = completadoInput.coords.longitude.toString().split(".")
    const paradaLat = parada.coordenadas.latitud.split(".")
    const paradaLon = parada.coordenadas.altitud.split(".")

    // Check if latitude and longitude are valids
    if (inputLat[0] !== paradaLat[0] || inputLat[1].substring(0, 3) !== paradaLat[1].substring(0, 3) ||
        inputLon[0] !== paradaLon[0] || inputLon[1].substring(0, 3) !== paradaLon[1].substring(0, 3)) {
      return null
    }

    const completado = await prisma.completado.create({
      data: {
        foto: completadoInput.foto,
        usuarioEmail: completadoInput.usuarioEmail,
        paradaId: completadoInput.paradaId
      }
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