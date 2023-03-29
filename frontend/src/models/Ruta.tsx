import { Parada } from "./Parada"

export type Ruta = {
    id: string
    titulo: string
    descripcion: string
    localizacion: string
    paradas: { parada: Parada }[]
}