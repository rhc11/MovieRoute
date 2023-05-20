import { Button, Icon, View } from "@ant-design/react-native"
import { Ruta } from "../models/Ruta"
import { tw } from "../lib/tailwind"
import { Text, Image } from "react-native"
import { CarouselMovies } from "./carouselMovies"

type Props = {
  ruta: Ruta
}

export const CardRuta: React.FC<Props> = ({ ruta }) => {

  return (
    <View style={tw`rounded-lg border-2 border-black m-2 w-full`}>
        <View style={tw`relative`}> 
          <Image
            source={{uri: ruta.paradas[0].parada.imagenes[1]}}
            alt="MovieRoute"
            style={tw`w-full rounded-t-lg h-36`}
            resizeMode="cover"
          />
          <Button
            style={tw`absolute -bottom-5 left-1/3 bg-primary text-black w-1/3 border-primary rounded-full`}
          >
            Ver más
          </Button>
        </View>
   
      <View style={tw`mt-6 mx-4 mb-2`}>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`w-13/16 text-xl mr-4`} numberOfLines={1} ellipsizeMode='tail'>{ruta.titulo}</Text>
          <Button
            style={tw`border-white`}
          >
            <Icon name="star" color='black' size={30}/>
          </Button>
        </View>
        <View style={tw`flex-row items-center mt-1`}>
          <Icon name="environment" color='black'/>
          <Text style={tw`text-base ml-2`} numberOfLines={1} ellipsizeMode='tail'>{ruta.localizacion}</Text>
        </View>
      </View>
      <View style={tw`w-full mt-4 mb-2`}>
          <CarouselMovies paradas={ruta.paradas} />
        </View>
    </View>
  )
}
