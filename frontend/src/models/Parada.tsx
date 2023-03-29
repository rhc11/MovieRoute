export type Parada = {
  id: string
  titulo: string
  descripcion: string
  direccion: string
  coordenadas: Coordenadas
  imagenes: string[]
  obras: string[]
}

type Coordenadas = {
  latitud: string
  altitud: string
}
