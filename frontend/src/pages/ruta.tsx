import { Button, Modal, NavBar, SpinLoading, Steps, Swiper } from "antd-mobile"
import axios from "axios"
import {
  LocationFill,
  StarOutline,
  StarFill,
  ExclamationCircleFill,
} from "antd-mobile-icons"
import { useEffect, useState } from "react"
import { Menu } from "../components/menu"
import { Ruta } from "../models/Ruta"
import { CarouselMovies } from "../components/carouselMovies"
import { useNavigate, useParams } from "react-router-dom"
import { Step } from "antd-mobile/es/components/steps/step"
import { AccessTokenKey, jwtDecoded, Session } from "../helpers/jwtDecode"

export const RutaPreview: React.FC = () => {
  const { rutaId } = useParams<{ rutaId: string }>()
  const [ruta, setRuta] = useState<Ruta | undefined>(undefined)
  const [imagenes, setImagenes] = useState<Array<JSX.Element>>([])
  const navigate = useNavigate()
  const [fav, setFav] = useState<string | undefined>(undefined)
  const token = localStorage.getItem(AccessTokenKey)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/ruta/${rutaId}`
      )

      const rutaData: Ruta = response.data

      setRuta(rutaData)
    } catch (error) {
      navigate(-1)
      console.error("Error al obtener las rutas:", error)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (ruta) {
      setFav(ruta.favoritos[0] ? ruta.favoritos[0].id : undefined)

      const todasLasImagenes = ruta.paradas
        .map((item) => item.parada.imagenes)
        .flat()

      const itemImagenes = todasLasImagenes.map((imagen, index) => (
        <Swiper.Item key={index}>
          <img
            src={imagen}
            alt={index.toString()}
            className="object-cover w-full"
          />
        </Swiper.Item>
      ))

      setImagenes(itemImagenes)
    }
  }, [ruta])

  const updateFav = async () => {
    try {
      const session: Session | null = jwtDecoded()

      if (!session) {
        Modal.alert({
          header: <ExclamationCircleFill className="text-6xl" />,
          title: "¡Ups! Parece que no tienes acceso",
          content: (
            <div className="text-center">
              <p>
                Únete ahora para disfrutar de todas las funciones y beneficios.
              </p>
              <p>¡Es fácil y rápido!</p>
            </div>
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
        { usuarioEmail: session.email, rutaId: ruta ? ruta.id : "" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
        `http://localhost:8080/usuarioFavorito/${fav}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  return (
    <div className="h-screen w-screen bg-white flex flex-col justify-center items-center ">
      <NavBar
        className="absolute inset-x-0 top-0 flex justify-between items-center"
        onBack={() => navigate(-1)}
        right={
          fav ? (
            <StarFill className="text-3xl ml-auto" onClick={onFav} />
          ) : (
            <StarOutline className="text-3xl ml-auto" onClick={onFav} />
          )
        }
      />
      <div className="w-screen h-full mt-12 mb-12 overflow-y-scroll hide-scrollbar">
        {ruta ? (
          <>
            <Swiper autoplay className="h-48 mb-6">
              {imagenes}
            </Swiper>
            <strong className="m-6 truncate text-xl">{ruta.titulo}</strong>
            <div className="m-6 flex mt-4 items-center mt-1">
              <LocationFill className="text-2xl truncate mr-2" />
              <p className="text-base">{ruta.localizacion}</p>
            </div>
            <Button
              size="large"
              className="bg-primary text-black border-primary w-full rounded-none border-x-0 "
            >
              Comenzar ruta
            </Button>
            <div className="m-4 bg-black rounded-lg mb-8">
              <p className="text-base text-primary p-4 text-center">
                Toma una foto en cada parada y podrás ganar increibles...
                <br />
                ¡Premios y descuentos!
              </p>
            </div>
            <strong className="m-6 text-lg">Información</strong>
            <p className="mx-6 mt-2 mb-6 text-base">
              {ruta.descripcion} Sed ut perspiciatis unde omnis iste natus error
              sit voluptatem accusantium doloremque laudantium, totam rem
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
              voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed{" "}
            </p>
            <strong className="m-6 text-lg">Películas y series</strong>
            <div className="w-full mt-4 mb-6">
              <CarouselMovies paradas={ruta.paradas} />
            </div>
            <strong className="m-6 text-lg">Recorrido</strong>

            <Steps
              direction="vertical"
              className="p-6 w-full"
              style={{
                "--title-font-size": "17px",
                "--description-font-size": "15px",
              }}
            >
              {ruta.paradas.map((parada) => (
                <Step
                  key={parada.parada.id}
                  title={parada.parada.titulo}
                  status="finish"
                  description={parada.parada.direccion}
                />
              ))}
            </Steps>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center ">
            <SpinLoading />
          </div>
        )}
      </div>
      <Menu />
    </div>
  )
}
