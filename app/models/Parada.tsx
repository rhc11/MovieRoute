export type Parada = {
  id: string
  titulo: string
  descripcion: string
  direccion: string
  coordenadas: Coordenadas
  imagenes: string[]
  obras: string[]
}

export type Coordenadas = {
  latitud: string
  altitud: string
}
