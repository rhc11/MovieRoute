import express from "express"
import cors from "cors"
import { rutasRouter } from "./routes/rutas"
import { usuariosRouter } from "./routes/usuarios"
import { loginRouter } from "./routes/login"
import { notificacionesRouter } from "./routes/notificaciones"
import { completadosRouter } from "./routes/completados"
import { rutaParadasRouter } from "./routes/rutaParada"
import { usuarioFavoritosRouter } from "./routes/usuarioFavorito"
import { usuarioRutasRouter } from "./routes/usuarioRuta"

const server = async () => {
  const app = express()

  app.use(express.json())
  app.use(cors({origin: '*'}))

  app.use("/login", loginRouter)
  app.use("/ruta", rutasRouter)
  app.use("/usuario", usuariosRouter)
  app.use("/notificacion", notificacionesRouter)
  app.use("/completado", completadosRouter)
  app.use("/rutaParada", rutaParadasRouter)
  app.use("/usuarioFavorito", usuarioFavoritosRouter)
  app.use("/usuarioRuta", usuarioRutasRouter)

  app.listen(process.env.PORT, () => {
    console.log(`backend listening at http://localhost:${process.env.PORT}`)
  })
}

server()
