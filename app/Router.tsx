import { NativeRouter, Route, Routes } from "react-router-native"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import { Home } from "./pages/home"
import { Favorites } from "./pages/favorites"
import { MisRutas } from "./pages/misRutas"
import { RutaPreview } from "./pages/ruta"
import { ParadaPreview } from "./pages/parada"
import { AcabadaPreview } from "./pages/acabada"
import { User } from "./pages/user"

// Defining route mapping
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
  acabadaPreview: {
    pathBuilder: () => '/acabada/:rutaId/',
    routeProps: {
      path: '/acabada/:rutaId/',
      element: <AcabadaPreview />
    }
  },
  cuenta: {
    pathBuilder: () => '/user',
    routeProps: {
      path: '/user',
      element: <User />
    }
  },
} as const

// Defining Router component
export const Router = () => {
  return (
    // Wrapping the routes in a NativeRouter component to enable routing in a react-native application
    <NativeRouter>
      <Routes>
        {/* Iterating over the values in RoutesMap and rendering a Route component for each one */}
        {Object.values(RoutesMap).map((route) => (
          <Route {...route.routeProps} key={route.routeProps.path} />
        ))}
      </Routes>
    </NativeRouter>
  )
}
