import { ScrollView, Text } from "react-native"
import { Menu } from "../components/menu"
import { tw } from "../lib/tailwind"
import { SearchBar, View } from "@ant-design/react-native"

export const Home = () => {
  return (
    <View style={{ flex: 1, zIndex: 1 }}>
      <SearchBar placeholder="Buscar ruta" style={tw`inset-x-0 top-0`} />

      <ScrollView style={{ flex: 1, zIndex: 0 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <Text>Contenido del ScrollView</Text>
        </View>
      </ScrollView>

      <Menu />
    </View>
  )
}
