import { Icon, TabBar } from "@ant-design/react-native"
import { useState } from "react"
import { useNavigate } from "react-router-native"
import { tw } from "../lib/tailwind"
import { View } from "react-native"

export const Menu: React.FC = () => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState("/home")

  const onChangeTab = (tab: string) => {
    setSelected(tab)
    navigate(tab)
  }

  return (
    <View style={tw`absolute inset-x-0 bottom-0`}>
      <TabBar unselectedTintColor="#949494" tintColor="#ffcd6b">
        <TabBar.Item
          title="Home"
          icon={<Icon name="home" />}
          selected={selected === "/home"}
          onPress={() => onChangeTab("/home")}
        />
        <TabBar.Item
          title="Mis rutas"
          icon={<Icon name="video-camera" />}
          selected={selected === "/misRutas"}
          onPress={() => onChangeTab("/misRutas")}
        />
        <TabBar.Item
          title="Favoritos"
          icon={<Icon name="star" />}
          selected={selected === "/favorites"}
          onPress={() => onChangeTab("/favorites")}
        />
        <TabBar.Item
          title="Perfil"
          icon={<Icon name="user" />}
          selected={selected === "/user"}
          onPress={() => onChangeTab("/user")}
        />
      </TabBar>
    </View>
  )
}
