import ProgressCircle from "react-native-progress-circle"
import { Ruta } from "../models/Ruta"
import { Text, TouchableOpacity } from "react-native"
import { tw } from "../lib/tailwind"
import { useNavigate } from "react-router-native"

type Props = {
  ruta: Ruta
}

export const ProgressRuta: React.FC<Props> = ({ ruta }) => {
  if (!ruta.paradasCompletadas) return <></>

  const navigate = useNavigate()

  const percent = Math.round(
    (ruta.paradasCompletadas.length / ruta.paradas.length) * 100
  )

  const onPress = () => (navigate(`/home/${ruta.id}`))

  return (
    <TouchableOpacity style={tw`flex-row items-center m-6`} onPress={onPress}>
      <ProgressCircle
        percent={percent}
        radius={50}
        borderWidth={4}
        color="#ffcd6b"
        shadowColor="#949494"
        bgColor="#fff"
      >
        <Text style={tw`text-2xl `}>{percent}%</Text>
      </ProgressCircle>
      <Text style={tw`flex-grow text-center text-xl w-2/3 ml-2 font-semibold`} numberOfLines={1}
            ellipsizeMode="tail">
        {ruta.titulo}
      </Text>
    </TouchableOpacity>
  )
}
