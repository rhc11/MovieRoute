import { Button, Modal } from "antd-mobile"
import {
  LocationFill,
  StarOutline,
  StarFill,
  ExclamationCircleFill,
} from "antd-mobile-icons"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecoded, Session } from "../helpers/jwtDecode"
import { Ruta } from "../models/Ruta"
import { CarouselMovies } from "./carouselMovies"

type Props = {
  ruta: Ruta
}

export const CardRuta: React.FC<Props> = ({ ruta }) => {
  const navigate = useNavigate()
  const [fav, setFav] = useState<string | undefined>(undefined)

  const getFav = async () => {
    try {
      const session: Session | null = jwtDecoded()

      if (!session) {
        return
      }

      const response = await axios.get(
        `http://localhost:8080/usuarioFavorito`,
        { params: { usuarioEmail: session.email, rutaId: ruta.id } }
      )
      if (response.data.id) {
        setFav(response.data.id)
      }
    } catch (error) {}
  }

  const updateFav = async () => {
    try {
      const session: Session | null = jwtDecoded()

      if (!session) {
        Modal.alert({
          header: <ExclamationCircleFill className="text-6xl" />,
          title: "¡Ups! Parece que no tienes acceso",
          content: (
            <>
              <p>
                Únete ahora para disfrutar de todas las funciones y beneficios.
              </p>
              <p>¡Es fácil y rápido!</p>
            </>
          ),
          closeOnMaskClick: true,
          onConfirm: () => {
            navigate("/register")
          },
        })
        return
      }

      const response = await axios.post(
        `http://localhost:8080/usuarioFavorito`,
        { usuarioEmail: session.email, rutaId: ruta.id }
      )

      if (response.data.id) {
        setFav(response.data.id)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const deleteFav = async () => {
    try {
      const session: Session | null = jwtDecoded()

      if (!session) {
        return
      }

      const response = await axios.delete(
        `http://localhost:8080/usuarioFavorito/${fav}`
      )

      if (response.data) {
        setFav(undefined)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const onFav = async () => {
    fav ? await deleteFav() : await updateFav()
  }

  useEffect(() => {
    getFav()
  }, [])

  return (
    <div className="rounded-lg border-2 border-black m-4">
      <div className="relative">
        <img
          src={ruta.paradas[0].parada.imagenes[1]}
          alt="MovieRoute"
          className="object-cover w-full border-b-2 border-black rounded-t-lg h-28"
        />
        <Button
          block
          shape="rounded"
          className="absolute -bottom-5 left-1/3 bg-primary text-black w-1/3 border-primary"
        >
          Ver más
        </Button>
      </div>
      <div className="mt-8 mx-4 mb-2">
        <div className="flex items-center justify-between">
          <strong className="w-6/8 truncate text-xl">{ruta.titulo}</strong>
          <Button className="border-white w-1/8" onClick={onFav}>
            {fav ? (
              <StarFill className="text-3xl" />
            ) : (
              <StarOutline className="text-3xl" />
            )}
          </Button>
        </div>
        <div className="flex items-center mt-1">
          <LocationFill className="text-2xl" />
          <p className="text-base">{ruta.localizacion}</p>
        </div>
      </div>
      <div className="w-full mt-4 mb-2">
        <CarouselMovies paradas={ruta.paradas} />
      </div>
    </div>
  )
}
