import ProgressCircle from "react-native-progress-circle"
import { Ruta } from "../models/Ruta"
import { Text, TouchableOpacity } from "react-native"
import { tw } from "../lib/tailwind"
import { useNavigate } from "react-router-native"

// Define prop types for the component
type Props = {
  ruta: Ruta
}

// Function component definition
export const ProgressRuta: React.FC<Props> = ({ ruta }) => {
  // If no stops have been completed, return nothing
  if (!ruta.paradasCompletadas) return <></>

  // Hook to navigate to different routes
  const navigate = useNavigate()

  // Calculate the percentage of stops that have been completed
  const percent = Math.round(
    (ruta.paradasCompletadas.length / ruta.paradas.length) * 100
  )

  // Function to handle the press event
  const onPress = () => (navigate(`/home/${ruta.id}`))

  // Return the TouchableOpacity component containing the progress circle and route title
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
