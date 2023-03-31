import { PrismaClient } from "@prisma/client"
import { RutaModelInput } from "../models/rutas"

const prisma = new PrismaClient()

export const getRutas = async (
  skip: number,
  search?: string,
  userEmail?: string,
  onlyFavs?: boolean,
  onlyUser?: boolean
) => {
  try {
    const rutas = await prisma.ruta.findMany({
      skip: skip,
      take: 5,
      where: {
        titulo: {
          contains: search || "",
        },
        favoritos:
          onlyFavs && userEmail
            ? {
                some: {
                  usuarioEmail: userEmail,
                },
              }
            : undefined,
        usuarios:
          onlyUser && userEmail
            ? {
                some: {
                  usuarioEmail: userEmail,
                },
              }
            : undefined,
      },
      include: {
        paradas: {
          select: {
            parada: true,
          },
        },
        favoritos: userEmail
          ? {
              where: {
                usuarioEmail: userEmail,
              },
              take: 1,
            }
          : undefined,
      },
    })

    if (onlyUser && userEmail) {
      const rutasConCompletados = await Promise.all(
        rutas.map(async (ruta) => {
          const paradasConCompletados = await prisma.parada.findMany({
            where: {
              rutas: {
                some: {
                  rutaId: ruta.id,
                },
              },
            },
            select: {
              id: true,
              completados: {
                where: {
                  usuarioEmail: userEmail,
                },
              },
            },
          })
          const completadasPorUsuario = paradasConCompletados.reduce(
            (count, parada) => count + (parada.completados.length > 0 ? 1 : 0),
            0
          )
          return { ...ruta, completadasPorUsuario }
        })
      )

      return rutasConCompletados
    }

    return rutas
  } catch (error) {
    throw error
  }
}

export const getRuta = async (id: string, userEmail?: string) => {
  try {
    const ruta = await prisma.ruta.findUnique({
      where: {
        id,
      },
      include: {
        paradas: {
          select: {
            parada: true,
          },
        },
        favoritos: userEmail
          ? {
              where: {
                usuarioEmail: userEmail,
              },
              take: 1,
            }
          : undefined,
      }
    })

    return ruta
  } catch (error) {
    throw error
  }
}

export const createRuta = async (rutaInput: RutaModelInput) => {
  try {
    const ruta = await prisma.ruta.create({
      data: rutaInput,
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
        id,
      },
      data: ruta,
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
