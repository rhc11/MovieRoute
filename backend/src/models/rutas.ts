import * as z from "zod"

export const RutaModel = z.object({
  id: z.string(),
  titulo: z.string(),
  descripcion: z.string(),
  localizacion: z.string(),
})

export type RutaModel = z.infer<typeof RutaModel>

export const RutaModelInput = RutaModel.omit({ id: true })

export type RutaModelInput = z.infer<typeof RutaModelInput>
