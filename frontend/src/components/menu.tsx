import { TabBar } from "antd-mobile"
import {
  UserOutline,
  UnorderedListOutline,
  MovieOutline,
  StarOutline,
} from "antd-mobile-icons"
import { NavLink, useNavigate } from "react-router-dom"
import { RoutesMap } from "../Router"

export const Menu: React.FC = () => {
  const navigate = useNavigate()
  const tabs = [
    {
      key: "/home",
      icon: <UnorderedListOutline />,
      label: (
        <NavLink to={RoutesMap.home.pathBuilder()}>
          Home
        </NavLink>
      ),
    },
    {
      key: "/home",
      title: "Mis rutas",
      icon: <MovieOutline />,
      label: (
        <NavLink to={RoutesMap.home.pathBuilder()}>
          Home
        </NavLink>
      ),
    },
    {
      key: "favs",
      title: "Favoritos",
      icon: <StarOutline />,
      label: (
        <NavLink to={RoutesMap.home.pathBuilder()}>
          Home
        </NavLink>
      ),
    },
    {
      key: "user",
      title: "Perfil",
      icon: <UserOutline />,
      label: (
        <NavLink to={RoutesMap.home.pathBuilder()}>
          Home
        </NavLink>
      ),
    },
  ]

  return (
    <TabBar onChange={value => navigate(value)} className="w-full absolute inset-x-0 bottom-0 border-t-2 bg-white">
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} />
      ))}
    </TabBar>
  )
}
