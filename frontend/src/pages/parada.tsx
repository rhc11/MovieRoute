import { Button, NavBar, SpinLoading, Steps, Swiper } from "antd-mobile"
import axios from "axios"
import { LocationFill, CameraOutline } from "antd-mobile-icons"
import { useEffect, useState } from "react"
import { Menu } from "../components/menu"
import { CarouselMovies } from "../components/carouselMovies"
import { useNavigate, useParams } from "react-router-dom"
import { Parada } from "../models/Parada"
import { Ruta } from "../models/Ruta"
import { Step } from "antd-mobile/es/components/steps/step"

export const ParadaPreview: React.FC = () => {
  const { rutaId, paradaId } = useParams<{ rutaId: string; paradaId: string }>()
  const [parada, setParada] = useState<Parada | undefined>(undefined)
  const [ruta, setRuta] = useState<Ruta | undefined>(undefined)
  const [imagenes, setImagenes] = useState<Array<JSX.Element>>([])
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const responseParada = await axios.get(
        `http://localhost:8080/parada/${paradaId}`
      )

      const paradaData: Parada = responseParada.data

      setParada(paradaData)

      const responseRuta = await axios.get(
        `http://localhost:8080/ruta/${rutaId}`
      )

      const rutaData: Ruta = responseRuta.data

      setRuta(rutaData)
    } catch (error) {
      //navigate(-1)
      console.error("Error al obtener las rutas:", error)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (parada) {
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
  }, [parada])

  return (
    <div className="h-screen w-screen bg-white flex flex-col justify-center items-center ">
      <NavBar
        className="absolute inset-x-0 top-0 flex justify-between items-center"
        onBack={() => navigate(-1)}
      >
        {ruta?.titulo || ''}
      </NavBar>
      <div className="w-screen h-full mt-12 mb-12 overflow-y-scroll hide-scrollbar">
        {(parada && ruta) ? (
          <>
            <Swiper autoplay className="h-48 mb-6">
              {imagenes}
            </Swiper>
            <strong className="m-6 truncate text-xl">{parada.titulo}</strong>
            <div className="m-6 flex mt-4 items-center mt-1">
              <LocationFill className="text-2xl truncate mr-2" />
              <p className="text-base">{parada.direccion}</p>
            </div>
            <Button
              size="large"
              className="bg-primary text-black border-primary w-full rounded-none border-x-0 flex justify-center items-center mb-6"
            >
              <CameraOutline className="text-3xl" />
            </Button>
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
                  status={stop.parada.id === parada.id ? 'process' : 'wait'}
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
