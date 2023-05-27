import { ScrollView, View, Image, Text, ActivityIndicator } from "react-native"
import { Menu } from "../components/menu"
import { tw } from "../lib/tailwind"
import { useNavigate, useParams } from "react-router-native"
import { Ruta } from "../models/Ruta"
import { useEffect, useState } from "react"
import axios from "axios"
import { AccessTokenKey, Session, jwtDecoded } from "../lib/jwtDecode"
import { Button, Carousel, Icon, Result, Steps } from "@ant-design/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CarouselMovies } from "../components/carouselMovies"
import { Completado } from "../models/Completado"

const Step = Steps.Step

export const AcabadaPreview = () => {
  const { rutaId } = useParams<{ rutaId: string }>()
  const [ruta, setRuta] = useState<Ruta | undefined>(undefined)
  const [completados, setCompletados] = useState<Array<Completado>>([])
  const [fotos, setFotos] = useState<Array<JSX.Element>>([])
  const [session, setSession] = useState<Session | null>(null)
  const [fav, setFav] = useState<string | undefined>(undefined)
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.57:8080/ruta/${rutaId}`,
        {
          params: {
            userEmail: session ? session.email : "",
          },
        }
      )

      const rutaData: Ruta = response.data

      setRuta(rutaData)

      const responseCompletado = await axios.get(
        `http://192.168.1.57:8080/completado`,
        {
          params: {
            userEmail: session ? session.email : "",
            rutaId: rutaId,
          },
        }
      )

      const responseCompletadoData: Array<Completado> = responseCompletado.data

      setCompletados(responseCompletadoData)
    } catch (error) {
      navigate(-1)
      console.error("Error al obtener las rutas:", error)
    }
  }

  useEffect(() => {
    if (ruta && ruta.paradasCompletadas) {
      if (ruta.paradasCompletadas.length !== ruta.paradas.length) {
        return navigate(`/home/${rutaId}`)
      }

      setFav(ruta.favoritos[0] ? ruta.favoritos[0].id : undefined)

      const todasLasImagenes = completados.map((item) => item.foto).flat()

      const itemImagenes = todasLasImagenes.map((imagen, index) => (
        <Image
          source={{ uri: imagen }}
          alt={index.toString()}
          style={tw`w-full h-full`}
          resizeMode="cover"
          key={index}
        />
      ))

      setFotos(itemImagenes)
    }
  }, [completados, navigate, ruta, rutaId])

  const updateFav = async () => {
    const token = await AsyncStorage.getItem(AccessTokenKey)
    try {
      const response = await axios.post(
        `http://192.168.1.57:8080/usuarioFavorito`,
        {
          usuarioEmail: session ? session.email : "",
          rutaId: ruta ? ruta.id : undefined,
        },
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
    const token = await AsyncStorage.getItem(AccessTokenKey)
    try {
      if (!session) {
        return
      }

      const response = await axios.delete(
        `http://192.168.1.57:8080/usuarioFavorito/${fav}`,
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

  useEffect(() => {
    const checkSession = async () => {
      const getSession: Session | null = await jwtDecoded()
      setSession(getSession)
    }
    checkSession()
  }, [])

  useEffect(() => {
    if (session) {
      fetchData()
    }
  }, [session])

  return (
    <View style={{ flex: 1, zIndex: 1 }}>
      <Button
        style={[
          tw`border-black rounded-full h-10 w-10 z-1 p-0`,
          { position: "absolute", top: 10, left: 10 },
        ]}
        activeStyle={[tw`bg-gray-700`]}
        onPress={() => navigate("/home")}
      >
        <Icon name="left" color="black" />
      </Button>

      <Button
        style={[
          tw`border-black rounded-full h-10 w-10 z-1 p-0`,
          { position: "absolute", top: 10, right: 10 },
        ]}
        activeStyle={[tw`bg-gray-700`]}
      >
        <Icon name="send" color="black" />
      </Button>
      {fav ? (
        <Button
          style={[
            tw`border-black rounded-full bg-primary h-10 w-10 z-1 p-0`,
            { position: "absolute", top: 10, right: 60 },
          ]}
          activeStyle={[tw`bg-gray-700`]}
          onPress={onFav}
        >
          <Icon name="star" color="black" />
        </Button>
      ) : (
        <Button
          style={[
            tw`border-black rounded-full h-10 w-10 z-1 p-0`,
            { position: "absolute", top: 10, right: 60 },
          ]}
          activeStyle={[tw`bg-gray-700`]}
          onPress={onFav}
        >
          <Icon name="star" color="black" />
        </Button>
      )}

      <ScrollView style={tw`flex-1 z-0`} showsVerticalScrollIndicator={false}>
        {ruta ? (
          <>
            <Text style={tw`mx-6 my-4 mt-16 text-xl `}>{ruta.titulo}</Text>

            <View style={tw`flex-row items-center mx-6 mb-4`}>
              <Icon name="environment" color="black" />
              <Text style={tw`text-base ml-2`}>{ruta.localizacion}</Text>
            </View>

            <Result
              imgUrl={require("./../assets/vectorsmile.png")}
              title="¡Enhorabuena!"
              message="Has completado la ruta"
              style={tw`p-4`}
            />

            <View style={tw`m-4 mb-6 bg-black rounded-lg`}>
              <Text style={tw`text-base text-primary p-4 text-center`}>
                {session?.nombre || "Usuario"}, revisa tu correo electrónico, te
                hemos enviado un regalo ;)
              </Text>
            </View>

            <Text style={tw`mx-6 text-lg mb-4`}>Aquí tienes tus fotos</Text>

            <Carousel infinite style={tw`h-48`}>
              {fotos}
            </Carousel>

            <View style={tw`flex-row justify-between items-center mt-4 px-32`}>
              <Button
                style={[tw`border-black rounded-full h-10 w-10 p-0`]}
                activeStyle={[tw`bg-gray-700`]}
              >
                <Icon name="instagram" color="black" />
              </Button>

              <Button
                style={[tw`border-black rounded-full h-10 w-10 p-0`]}
                activeStyle={[tw`bg-gray-700`]}
              >
                <Icon name="twitter" color="black" />
              </Button>

              <Button
                style={[tw`border-black rounded-full h-10 w-10 p-0`]}
                activeStyle={[tw`bg-gray-700`]}
              >
                <Icon name="send" color="black" />
              </Button>
            </View>

            <View style={tw`w-full mt-8`}>
              <CarouselMovies paradas={ruta.paradas} />
            </View>

            <Text style={tw`m-6 text-lg`}>Recorrido</Text>
            <View style={tw`w-full mx-6 mb-12`}>
              <Steps direction="vertical">
                {ruta.paradas.map((parada) => (
                  <Step
                    key={parada.parada.id}
                    title={parada.parada.titulo}
                    status="finish"
                    description={parada.parada.direccion}
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
