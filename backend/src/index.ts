// Importing necessary modules
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
import { paradasRouter } from "./routes/paradas"

// Defining server function
const server = async () => {
  // Initializing an Express application
  const app = express()

  // Adding middleware for parsing JSON and enabling CORS
  app.use(express.json())
  app.use(cors({origin: '*'}))

  // Defining routes for our application
  app.use("/login", loginRouter)
  app.use("/ruta", rutasRouter)
  app.use("/parada", paradasRouter)
  app.use("/usuario", usuariosRouter)
  app.use("/notificacion", notificacionesRouter)
  app.use("/completado", completadosRouter)
  app.use("/rutaParada", rutaParadasRouter)
  app.use("/usuarioFavorito", usuarioFavoritosRouter)
  app.use("/usuarioRuta", usuarioRutasRouter)

  // Starting the server
  app.listen(process.env.PORT, () => {
    console.log(`backend listening at http://localhost:${process.env.PORT}`)
  })
}

// Starting the server
server()
