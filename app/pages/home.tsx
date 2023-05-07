import { Menu } from "../components/menu"
import { tw } from "../lib/tailwind"
import { SearchBar, View } from "@ant-design/react-native"

export const Home = () => {
  return (
    <View>
      <SearchBar
        placeholder="Buscar ruta"
        style={tw`fabsolute inset-x-0 top-0`}
      />
      <Menu />
    </View>
  )
}
