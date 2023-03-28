import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/login"
import { Register } from "./pages/register"

export const RoutesMap = {
  protected: {
    home: {
      pathBuilder: () => "/",
      routeProps: {
        path: "/",
        element: <>Home</>,
      },
    },
  },
  public: {
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
  },
} as const

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {Object.values(RoutesMap.protected).map((route) => (
          <Route {...route.routeProps} key={route.routeProps.path} />
        ))}

        {Object.values(RoutesMap.public).map((route) => (
          <Route {...route.routeProps} key={route.routeProps.path} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
