import {
  Button,
  Modal,
  NavBar,
  SpinLoading,
  Steps,
  Swiper,
  Result,
} from "antd-mobile"
import axios from "axios"
import {
  LocationFill,
  CameraOutline,
  ExclamationCircleFill,
} from "antd-mobile-icons"
import { useEffect, useState } from "react"
import { Menu } from "../components/menu"
import { CarouselMovies } from "../components/carouselMovies"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { Parada } from "../models/Parada"
import { Ruta } from "../models/Ruta"
import { Step } from "antd-mobile/es/components/steps/step"
import { AccessTokenKey, jwtDecoded, Session } from "../helpers/jwtDecode"

export const ParadaPreview: React.FC = () => {
  const { rutaId, paradaId } = useParams<{ rutaId: string; paradaId: string }>()
  const [parada, setParada] = useState<Parada | undefined>(undefined)
  const [ruta, setRuta] = useState<Ruta | undefined>(undefined)
  const [nextParada, setNextParada] = useState<string | undefined>(undefined)
  const [imagenes, setImagenes] = useState<Array<JSX.Element>>([])
  const [finish, setFinish] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem(AccessTokenKey)
  const session: Session | null = jwtDecoded()

  const fetchData = async () => {
    try {
      const responseParada = await axios.get(
        `http://localhost:8080/parada/${paradaId}`
      )

      const paradaData: Parada = responseParada.data

      setParada(paradaData)

      const responseRuta = await axios.get(
        `http://localhost:8080/ruta/${rutaId}`,
        {
          params: {
            userEmail: session ? session.email : "",
          },
        }
      )
      const rutaData: Ruta = responseRuta.data

      setRuta(rutaData)
    } catch (error) {
      navigate(-1)
      console.error("Error al obtener las rutas:", error)
    }
  }

  useEffect(() => {
    setFinish(false)
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  useEffect(() => {
    if (parada && ruta) {
      const paradasDiferentes = ruta.paradas
        .filter((p) => {
          return (
            p.parada.id !== parada.id &&
            !ruta.paradasCompletadas?.find((pc) => pc.paradaId === p.parada.id)
          )
        })
        .map((p) => p.parada)

      paradasDiferentes.length !== 0
        ? setNextParada(paradasDiferentes[0].id)
        : setNextParada(undefined)

      if (ruta.paradasCompletadas?.some((pc) => pc.paradaId === parada.id)) {
        setFinish(true)
      }

      const itemImagenes = parada.imagenes.map((imagen, index) => (
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
  }, [parada, ruta])

  //Change to finish
  const onNext = () => {
    console.log(nextParada)
    nextParada
      ? navigate(`/home/${rutaId}/parada/${nextParada}`, {
          state: { forceRefresh: true },
        })
      : navigate(`/home/${rutaId}`, { state: { forceRefresh: true } })
  }

  const step = (stepParada: string) => {
    if (!parada || !ruta || !ruta.paradasCompletadas) return "error"
    if (stepParada === parada.id) return "process"
    if (
      ruta.paradasCompletadas.some((parada) => parada.paradaId === stepParada)
    )
      return "finish"
    return "wait"
  }

  const onClick = async () => {
    try {
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
        `http://localhost:8080/completado/`,
        { usuarioEmail: session.email, paradaId: paradaId, foto: "Foto.png" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response.data)
      if (response.data) {
        setFinish(true)
      }
    } catch (error) {
      navigate(-1)
      console.error(error)
    }
  }

  return (
    <div className="h-screen w-screen bg-white flex flex-col justify-center items-center ">
      <NavBar
        className="absolute inset-x-0 top-0 flex justify-between items-center"
        onBack={() => navigate(-1)}
      >
        {ruta?.titulo || ""}
      </NavBar>
      <div className="w-screen h-full mt-12 mb-12 overflow-y-scroll hide-scrollbar">
        {parada && ruta ? (
          <>
            <Swiper autoplay className="h-48 mb-6">
              {imagenes}
            </Swiper>
            <strong className="m-6 truncate text-xl">{parada.titulo}</strong>
            <div className="m-6 flex mt-4 items-center mt-1">
              <LocationFill className="text-2xl truncate mr-2" />
              <p className="text-base">{parada.direccion}</p>
            </div>
            {finish ? (
              <Result
                status="success"
                title="Parada completada"
                className="p-4"
              />
            ) : (
              <Button
                size="large"
                className="bg-primary text-black border-primary w-full rounded-none border-x-0 flex justify-center items-center mb-6"
                onClick={onClick}
              >
                <CameraOutline className="text-3xl" />
              </Button>
            )}
            <div className="m-6 flex mt-4 items-center mt-1">
              <Button
                size="large"
                className="bg-white text-black border-2 border-black rounded-none flex justify-center items-center w-full mr-2"
                onClick={() => navigate(-1)}
              >
                Atrás
              </Button>
              <Button
                size="large"
                className={`${
                  finish ? "bg-primary" : "bg-white"
                } text-black border-2 border-black rounded-none flex justify-center items-center w-full ml-2`}
                onClick={onNext}
              >
                Siguiente
              </Button>
            </div>
            <strong className="m-6 text-lg">De interés</strong>
            <p className="mx-6 mt-2 mb-6 text-base">
              {parada.descripcion} Sed ut perspiciatis unde omnis iste natus
              error sit voluptatem accusantium doloremque laudantium, totam rem
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
              voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed{" "}
            </p>
            <strong className="m-6 text-lg">Películas y series</strong>
            <div className="w-full mt-4 mb-6">
              <CarouselMovies paradas={[{ parada: parada }]} />
            </div>
            <strong className="m-6 text-lg">Como llegar</strong>
            <Steps
              direction="vertical"
              className="p-6 w-full"
              style={{
                "--title-font-size": "17px",
                "--description-font-size": "15px",
              }}
            >
              {ruta.paradas.map((stop) => (
                <Step
                  key={stop.parada.id}
                  title={stop.parada.titulo}
                  status={step(stop.parada.id)}
                  description={stop.parada.direccion}
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
