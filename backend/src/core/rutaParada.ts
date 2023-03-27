import { PrismaClient } from "@prisma/client"
import { RutaParadaModelInput } from "../models/rutaParada"

const prisma = new PrismaClient()

export const getRutaParadas = async () => {
  try {
    const rutaParadas = await prisma.rutaParada.findMany()

    return rutaParadas
  } catch (error) {
    throw error
  }
}

export const getRutaParada = async (id: string) => {
  try {
    const rutaParada = await prisma.rutaParada.findUnique({
      where: {
        id,
      },
    })

    return rutaParada
  } catch (error) {
    throw error
  }
}

export const createRutaParada = async (rutaParadaInput: RutaParadaModelInput) => {
  try {
    const rutaParada = await prisma.rutaParada.create({
      data: rutaParadaInput
    })

    return rutaParada
  } catch (error) {
    throw error
  }
}

export const updateRutaParada = async (rutaParada: RutaParadaModelInput, id: string) => {
  try {
    const rutaParadaUpdated = await prisma.rutaParada.update({
      where: {
        id
      },
      data: rutaParada
    })

    return rutaParadaUpdated
  } catch (error) {
    throw error
  }
}

export const deleteRutaParada = async (id: string) => {
  try {
    const rutaParada = await prisma.rutaParada.delete({
      where: {
        id,
      },
    })

    return rutaParada
  } catch (error) {
    throw error
  }
}