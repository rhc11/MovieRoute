import { Icon, TabBar } from "@ant-design/react-native"
import { useNavigate, useLocation } from "react-router-native"
import { tw } from "../lib/tailwind"
import { View } from "react-native"

// Function component definition
export const Menu: React.FC = () => {
  // Hook to navigate to different routes
  const navigate = useNavigate()

  // Hook to get the current location (route)
  const location = useLocation()

  // Function to change the tab
  const onChangeTab = (tab: string) => {
    navigate(tab)
  }

  // Return the TabBar component
  return (
    <View style={tw`absolute inset-x-0 bottom-0`}>
      <TabBar unselectedTintColor="black" tintColor="#ffcd6b">
        <TabBar.Item
          title="Home"
          icon={<Icon name="home" />}
          selected={location.pathname === "/home"}
          onPress={() => onChangeTab("/home")}
        />
        <TabBar.Item
          title="Mis rutas"
          icon={<Icon name="video-camera" />}
          selected={location.pathname === "/misRutas"}
          onPress={() => onChangeTab("/misRutas")}
        />
        <TabBar.Item
          title="Favoritos"
          icon={<Icon name="star" />}
          selected={location.pathname === "/favorites"}
          onPress={() => onChangeTab("/favorites")}
        />
        <TabBar.Item
          title="Perfil"
          icon={<Icon name="user" />}
          selected={location.pathname === "/user"}
          onPress={() => onChangeTab("/user")}
        />
      </TabBar>
    </View>
  )
}
