import * as z from "zod"

export const ParadaModel = z.object({
  id: z.string(),
  titulo: z.string(),
  descripcion: z.string(),
  direccion: z.string(),
  coordenadas: z.object({
    latitud: z.string(),
    altitud: z.string()
  }),
  imagenes: z.string().array(),
  obras: z.string().array()
})

export type ParadaModel = z.infer<typeof ParadaModel>

export const ParadaModelInput = ParadaModel.omit({ id: true })

export type ParadaModelInput = z.infer<typeof ParadaModelInput>
