import { PrismaClient } from "@prisma/client"
import { RutaModelInput } from "../models/rutas"

const prisma = new PrismaClient()

export const getRutas = async (skip: number) => {
  try {
    const rutas = await prisma.ruta.findMany({
      skip: skip,
      take: 5,
      include: {
        paradas: {
          select: {
            parada: true,
          },
        },
      },
    })

    return rutas
  } catch (error) {
    throw error
  }
}

export const getRuta = async (id: string) => {
  try {
    const ruta = await prisma.ruta.findUnique({
      where: {
        id,
      },
    })

    return ruta
  } catch (error) {
    throw error
  }
}

export const createRuta = async (rutaInput: RutaModelInput) => {
  try {
    const ruta = await prisma.ruta.create({
      data: rutaInput
    })

    return ruta
  } catch (error) {
    throw error
  }
}

export const updateRuta = async (ruta: RutaModelInput, id: string) => {
  try {
    const rutaUpdated = await prisma.ruta.update({
      where: {
        id
      },
      data: ruta
    })

    return rutaUpdated
  } catch (error) {
    throw error
  }
}

export const deleteRuta = async (id: string) => {
  try {
    const ruta = await prisma.ruta.delete({
      where: {
        id,
      },
    })

    return ruta
  } catch (error) {
    throw error
  }
}