import express from "express"
import cors from "cors"
import { rutasRouter } from './routes/rutas'
import { usuariosRouter } from "./routes/usuarios"
import { loginRouter } from "./routes/login"

const server = async () => {
  const app = express()
  
  app.use(express.json())
  app.use(cors())
  
  app.use('/login', loginRouter)
  app.use('/ruta', rutasRouter)
  app.use('/usuario', usuariosRouter)

  app.listen(process.env.PORT, () => {
    console.log(`backend listening at http://localhost:${process.env.PORT}`)
  })
}

server()
