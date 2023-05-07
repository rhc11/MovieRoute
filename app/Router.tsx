import { NativeRouter, Route, Routes } from "react-router-native"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import { Home } from "./pages/home"

export const RoutesMap = {
  init: {
    pathBuilder: () => "/",
    routeProps: {
      path: "/",
      element: <Login />,
    },
  },
  login: {
    pathBuilder: () => "/login",
    routeProps: {
      path: "/login",
      element: <Login />,
    },
  },
  register: {
    pathBuilder: () => "/register",
    routeProps: {
      path: "/register",
      element: <Register />,
    },
  },
  home: {
    pathBuilder: () => "/home",
    routeProps: {
      path: "/home",
      element: <Home />,
    },
  },
} as const

export const Router = () => {
  return (
    <NativeRouter>
      <Routes>
        {Object.values(RoutesMap).map((route) => (
          <Route {...route.routeProps} key={route.routeProps.path} />
        ))}
      </Routes>
    </NativeRouter>
  )
}
