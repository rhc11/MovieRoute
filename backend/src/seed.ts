import { Parada, PrismaClient, Ruta } from "@prisma/client"
import { RutaModelInput } from "./models/rutas"
import { ParadaModelInput } from "./models/paradas"

const prisma = new PrismaClient()



export const index = async (rutaInput: RutaModelInput) => {
    const rutas: Array<RutaModelInput> = [
        {
          titulo: "Ruta falsa 1",
          descripcion: "Esta es la ruta falsa 1",
          localizacion: "Motilla del Palancar",
        },
        {
          titulo: "Ruta falsa 2",
          descripcion: "Esta es la ruta falsa 2",
          localizacion: "Motilla del Palancar",
        },
        {
          titulo: "Ruta falsa 3",
          descripcion: "Esta es la ruta falsa 3",
          localizacion: "Motilla del Palancar",
        },
      ]
      
      const paradas: Array<ParadaModelInput> = [
        {
          titulo: "Parada falsa 1",
          descripcion: "Esta es la parada falsa 1",
          direccion: "Madrid, Calle Pepido 1",
          coordenadas: {
            latitud: "39.563657",
            altitud: "-1.913455",
          },
          imagenes: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Motilla_de_Planacar_08.jpg/220px-Motilla_de_Planacar_08.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCuloNN4nAMp74toPaWvtDuT8Ji4-AVeqT4cFsrtxfhKYOfiiutDhR2kxoLkn7xviQqwU&usqp=CAU",
          ],
          obras: [
            "Babylon",
            "The last of us",
          ],
        },
        {
          titulo: "Parada falsa 2",
          descripcion: "Esta es la parada falsa 2",
          direccion: "Madrid, Calle Pepido 2",
          coordenadas: {
            latitud: "39.563857",
            altitud: "-1.913115",
          },
          imagenes: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Motilla_de_Planacar_08.jpg/220px-Motilla_de_Planacar_08.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCuloNN4nAMp74toPaWvtDuT8Ji4-AVeqT4cFsrtxfhKYOfiiutDhR2kxoLkn7xviQqwU&usqp=CAU",
          ],
          obras: [
            "Babylon",
            "The last of us",
          ],
        },
        {
          titulo: "Parada falsa 3",
          descripcion: "Esta es la parada falsa 3",
          direccion: "Madrid, Calle Pepido 3",
          coordenadas: {
            latitud: "39.513657",
            altitud: "-1.913400",
          },
          imagenes: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Motilla_de_Planacar_08.jpg/220px-Motilla_de_Planacar_08.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCuloNN4nAMp74toPaWvtDuT8Ji4-AVeqT4cFsrtxfhKYOfiiutDhR2kxoLkn7xviQqwU&usqp=CAU",
          ],
          obras: [
            "Babylon",
            "The last of us",
          ],
        },
      ]

  try {
    const rutaArray: Array<Ruta> = await Promise.all(rutas.map((ruta) => {
        return prisma.ruta.create({
            data: ruta,
          })
    }))

    const paradaArray: Array<Parada> = await Promise.all(paradas.map((parada) => {
        return prisma.parada.create({
            data: parada,
          })
    }))

    console.log(rutaArray,paradaArray)

    return await Promise.all(rutaArray.map(async (ruta) => {
        await Promise.all(paradaArray.map((parada) => {
            return prisma.rutaParada.create({
                data: {
                    rutaId: ruta.id,
                    paradaId: parada.id
                }
              })
        }))
    }))
    
  } catch (error) {
    throw error
  }
}
