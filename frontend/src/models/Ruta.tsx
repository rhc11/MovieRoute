import { Parada } from "./Parada"

export type Ruta = {
  id: string
  titulo: string
  descripcion: string
  localizacion: string
  favoritos: Favoritos[]
  paradas: { parada: Parada }[]
}

type Favoritos = {
  id: string
  rutaId: string
  usuarioEmail: string
}
