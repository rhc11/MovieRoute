import * as z from "zod"

export const RutaParadaModel = z.object({
  id: z.string(),
  paradaId: z.string(),
  rutaId: z.string()
})

export type RutaParadaModel = z.infer<typeof RutaParadaModel>

export const RutaParadaModelInput = RutaParadaModel.omit({ id: true })

export type RutaParadaModelInput = z.infer<typeof RutaParadaModelInput>
