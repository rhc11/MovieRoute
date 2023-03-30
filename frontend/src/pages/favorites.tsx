import { ErrorBlock, Modal, SearchBar, SpinLoading } from "antd-mobile"
import { ExclamationCircleFill } from "antd-mobile-icons"
import { Menu } from "../components/menu"
import { CardRuta } from "../components/cardRuta"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Ruta } from "../models/Ruta"
import { jwtDecoded, Session } from "../helpers/jwtDecode"
import { useNavigate } from "react-router-dom"

export const Favorites = () => {
  const [data, setData] = useState<Array<Ruta>>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const containerRef = useRef<HTMLDivElement | null>(null)
  const hasMountedRef = useRef(false)
  const session: Session | null = jwtDecoded()
  const navigate = useNavigate()

  const fetchData = async (skip: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/ruta`, {
        params: {
          skip,
          search,
          userEmail: session ? session.email : "",
          onlyFavs: true,
        },
      })

      const rutasArray: Array<Ruta> = response.data

      setData((prevData) => [...prevData, ...rutasArray])
    } catch (error) {
      console.error("Error al obtener las rutas:", error)
    }
    setLoading(false)
  }
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget
    if (scrollHeight - scrollTop === clientHeight) {
      fetchData(data.length)
    }
  }

  const handleSearch = (value: string) => {
    setData([])
    hasMountedRef.current = false
    setSearch(value)
  }

  useEffect(() => {
    if (!hasMountedRef.current) {
      session
        ? fetchData(0)
        : Modal.alert({
            header: <ExclamationCircleFill className="text-6xl" />,
            title: "¡Ups! Parece que no tienes acceso",
            content: (
              <div className="text-center">
                <p>
                  Únete ahora para disfrutar de todas las funciones y
                  beneficios.
                </p>
                <p>¡Es fácil y rápido!</p>
              </div>
            ),
            closeOnMaskClick: true,
            onClose: () => {
              navigate("/register")
            },
          })
      hasMountedRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <div className="h-screen w-screen bg-white flex flex-col justify-center items-center ">
      <SearchBar
        placeholder="Buscar ruta favorita"
        className="absolute inset-x-0 top-0 m-4"
        onSearch={handleSearch}
      />

      {session ? (
        <div
          className="w-full h-full mt-14 mb-12 overflow-y-scroll hide-scrollbar"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {data.map((ruta, index) => (
            <CardRuta key={index} ruta={ruta} />
          ))}
          <div className="flex flex-col justify-center items-center ">
            {loading && <SpinLoading />}
            {data.length === 0 && <ErrorBlock status="empty" />}
          </div>
        </div>
      ) : (
        <></>
      )}

      <Menu />
    </div>
  )
}
