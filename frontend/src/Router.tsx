import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import { Home } from "./pages/home"
import { Favorites } from './pages/favorites'
import { MisRutas } from "./pages/misRutas"
import { RutaPreview } from './pages/ruta'
import { ParadaPreview } from './pages/parada';

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
  favorites: {
    pathBuilder: () => "/favorites",
    routeProps: {
      path: "/favorites",
      element: <Favorites />,
    },
  },
  misRutas: {
    pathBuilder: () => "/misRutas",
    routeProps: {
      path: "/misRutas",
      element: <MisRutas />,
    },
  },
  rutaPreview: {
    pathBuilder: () => '/home/:rutaId',
    routeProps: {
      path: '/home/:rutaId',
      element: <RutaPreview />
    }
  },
  paradaPreview: {
    pathBuilder: () => '/home/:rutaId/parada/:paradaId',
    routeProps: {
      path: '/home/:rutaId/parada/:paradaId',
      element: <ParadaPreview />
    }
  },
} as const

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {Object.values(RoutesMap).map((route) => (
          <Route {...route.routeProps} key={route.routeProps.path} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
