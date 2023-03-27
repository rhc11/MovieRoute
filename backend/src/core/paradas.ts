import { PrismaClient } from "@prisma/client"
import { ParadaModelInput } from "../models/paradas"

const prisma = new PrismaClient()

export const getParadas = async () => {
  try {
    const paradas = await prisma.parada.findMany()

    return paradas
  } catch (error) {
    throw error
  }
}

export const getParada = async (id: string) => {
  try {
    const parada = await prisma.parada.findUnique({
      where: {
        id,
      },
    })

    return parada
  } catch (error) {
    throw error
  }
}

export const createParada = async (paradaInput: ParadaModelInput) => {
  try {
    const parada = await prisma.parada.create({
      data: paradaInput
    })

    return parada
  } catch (error) {
    throw error
  }
}

export const updateParada = async (parada: ParadaModelInput, id: string) => {
  try {
    const paradaUpdated = await prisma.parada.update({
      where: {
        id
      },
      data: parada
    })

    return paradaUpdated
  } catch (error) {
    throw error
  }
}

export const deleteParada = async (id: string) => {
  try {
    const parada = await prisma.parada.delete({
      where: {
        id,
      },
    })

    return parada
  } catch (error) {
    throw error
  }
}