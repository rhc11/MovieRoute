import {
  ScrollView,
  View,
  Image,
  Text,
  ActivityIndicator,
  Modal,
} from "react-native"
import { Menu } from "../components/menu"
import { tw } from "../lib/tailwind"
import { useLocation, useNavigate, useParams } from "react-router-native"
import { Ruta } from "../models/Ruta"
import { useEffect, useState } from "react"
import axios from "axios"
import { AccessTokenKey, Session, jwtDecoded } from "../lib/jwtDecode"
import { Button, Carousel, Icon, Steps, Result } from "@ant-design/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CarouselMovies } from "../components/carouselMovies"
import { Parada } from "../models/Parada"
import { Camara } from "../components/camara"

const Step = Steps.Step

export const ParadaPreview = () => {
  const { rutaId, paradaId } = useParams<{ rutaId: string; paradaId: string }>()
  const [parada, setParada] = useState<Parada | undefined>(undefined)
  const [ruta, setRuta] = useState<Ruta | undefined>(undefined)
  const [nextParada, setNextParada] = useState<string | undefined>(undefined)
  const [finish, setFinish] = useState<boolean>(false)
  const [session, setSession] = useState<Session | null>(null)
  const [imagenes, setImagenes] = useState<Array<JSX.Element>>([])
  const [cameraVisible, setCameraVisible] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const fetchData = async () => {
    try {
      const responseParada = await axios.get(
        `http://192.168.1.57:8080/parada/${paradaId}`
      )

      const paradaData: Parada = responseParada.data

      setParada(paradaData)

      const responseRuta = await axios.get(
        `http://192.168.1.57:8080/ruta/${rutaId}`,
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
        <Image
          source={{ uri: imagen }}
          alt={index.toString()}
          style={tw`w-full h-full`}
          resizeMode="cover"
          key={index}
        />
      ))

      setImagenes(itemImagenes)
    }
  }, [parada, ruta])

  const onNext = () => {
    nextParada
      ? navigate(`/home/${rutaId}/parada/${nextParada}`, {
          state: { forceRefresh: true },
        })
      : navigate(`/acabada/${rutaId}`, { state: { forceRefresh: true } })
  }

  const step = (stepParada: string) => {
    if (!parada || !ruta || !ruta.paradasCompletadas) return "error"
    if (stepParada === parada.id) return "wait"
    if (
      ruta.paradasCompletadas.some((parada) => parada.paradaId === stepParada)
    )
      return "finish"
    return "wait"
  }

  useEffect(() => {
    const checkSession = async () => {
      const getSession: Session | null = await jwtDecoded()
      setSession(getSession)
    }
    checkSession()
  }, [])

  useEffect(() => {
    if (session) {
      setFinish(false)
      fetchData()
    }
  }, [session])

  useEffect(() => {
    setFinish(false)
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <View style={{ flex: 1, zIndex: 1 }}>
      <Button
        style={[
          tw`border-black rounded-full h-10 w-10 z-1 p-0`,
          { position: "absolute", top: 10, left: 10 },
        ]}
        activeStyle={[tw`bg-gray-700`]}
        onPress={() => navigate(-1)}
      >
        <Icon name="left" color="black" />
      </Button>

      {!nextParada && !finish ? (
        <></>
      ) : (
        <Button
          style={[
            tw`border-black rounded-full h-10 w-10 z-1 p-0`,
            { position: "absolute", top: 10, right: 10 },
          ]}
          activeStyle={[tw`bg-gray-700`]}
          onPress={() => onNext()}
        >
          <Icon name="right" color="black" />
        </Button>
      )}
      <ScrollView style={tw`flex-1 z-0`} showsVerticalScrollIndicator={false}>
        {parada && ruta ? (
          <>
            <Button
              style={[
                tw`border-black rounded-full h-10 w-10 z-1 p-0`,
                { position: "absolute", top: 140, right: 10 },
              ]}
              activeStyle={[tw`bg-gray-700`]}
            >
              <Icon name="share-alt" color="black" />
            </Button>

            <Carousel infinite style={tw`h-48`}>
              {imagenes}
            </Carousel>
            <Text style={tw`mx-6 my-4 text-xl `}>{parada.titulo}</Text>

            <View style={tw`flex-row items-center mx-6 mb-4`}>
              <Icon name="environment" color="black" />
              <Text style={tw`text-base ml-2`}>{parada.direccion}</Text>
            </View>

            {finish ? (
              <>
                <Result
                  imgUrl={require("./../assets/vectorsuccess.png")}
                  title="Completada"
                  message="¡Acaba la ruta para ganar premios!"
                  style={tw`p-4`}
                />
                <Button
                  style={tw`bg-primary text-black border-primary w-full rounded-none`}
                  onPress={onNext}
                >
                  Siguiente
                </Button>
              </>
            ) : (
              <Button
                style={tw`bg-primary text-black border-primary w-full rounded-none`}
                onPress={() => setCameraVisible(true)}
              >
                <Icon name="camera" color="black" size="lg" />
              </Button>
            )}

            <Modal
              animationType="slide"
              transparent={false}
              visible={cameraVisible}
              onRequestClose={() => setCameraVisible(false)}
            >
              <Camara 
                usuarioEmail={session ? session.email : ''}
                paradaId={paradaId ? paradaId : ''}
                setFinish={setFinish}
                setCameraVisible={setCameraVisible}
              />
            </Modal>

            <Text style={tw`mx-6 text-lg mt-6`}>De interés</Text>
            <Text style={tw`mx-6 mt-2 mb-6 text-base`}>
              {parada.descripcion} Sed ut perspiciatis unde omnis iste natus
              error sit voluptatem accusantium doloremque laudantium, totam rem
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
              voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
            </Text>

            <View style={tw`w-full`}>
              <CarouselMovies paradas={[{ parada: parada }]} />
            </View>

            <Text style={tw`m-6 text-lg`}>Recorrido</Text>
            <View style={tw`w-full mx-6 mb-12`}>
              <Steps direction="vertical">
                {ruta.paradas.map((stop) => (
                  <Step
                    key={stop.parada.id}
                    title={stop.parada.titulo}
                    status={step(stop.parada.id)}
                    description={stop.parada.direccion}
                  />
                ))}
              </Steps>
            </View>
          </>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </ScrollView>
      <Menu />
    </View>
  )
}
