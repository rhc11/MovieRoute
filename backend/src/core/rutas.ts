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
        // Filters for favorite routes if onlyFavs and userEmail are specified
        favoritos:
          onlyFavs && userEmail
            ? {
                some: {
                  usuarioEmail: userEmail,
                },
              }
            : undefined,
        // Filters for user routes if onlyUser and userEmail are specified
        usuarios:
          onlyUser && userEmail
            ? {
                some: {
                  usuarioEmail: userEmail,
                },
              }
            : undefined,
      },
      // Orders the routes by title in ascending order
      orderBy: {
        titulo: 'asc'
      },
      include: {
        paradas: {
          select: {
            parada: true,
          },
        },
        // Includes favorite routes if userEmail is specified
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

    // If onlyUser and userEmail are specified, fetches completed routes
    if (onlyUser && userEmail) {
      const rutasConCompletados = await Promise.all(
        rutas.map(async (ruta) => {
          const paradasCompletadas = await prisma.rutaParada.findMany({
            where: {
              ruta: { id: ruta.id },
              parada: {
                completados: {
                  some: {
                    usuario: { email: userEmail },
                  },
                },
              },
            },
          })
          return { ...ruta, paradasCompletadas }
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
        // Includes favorite routes if userEmail is specified
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

    // If userEmail is specified and a route is found, fetches completed routes
    if (userEmail && ruta) {
      const paradasCompletadas = await prisma.rutaParada.findMany({
        where: {
          ruta: { id: ruta.id },
          parada: {
            completados: {
              some: {
                usuario: { email: userEmail },
              },
            },
          },
        },
      })

      return { ...ruta, paradasCompletadas }
    }

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
