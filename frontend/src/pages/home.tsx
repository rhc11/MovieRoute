import { ErrorBlock, SearchBar, SpinLoading } from "antd-mobile"
import { Menu } from "../components/menu"
import { CardRuta } from "../components/cardRuta"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Ruta } from "../models/Ruta"
import { jwtDecoded, Session } from "../helpers/jwtDecode"

export const Home = () => {
  const [data, setData] = useState<Array<Ruta>>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [noSkip, setNoSkip] = useState(-1)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const hasMountedRef = useRef(false)
  const session: Session | null = jwtDecoded()

  const fetchData = async (skip: number) => {
    if (skip === noSkip) return
    setLoading(true)
    try {
      setNoSkip(data.length)
      const response = await axios.get(`http://localhost:8080/ruta`, {
        params: { skip, search, userEmail: session ? session.email : "" },
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
      fetchData(0)
      hasMountedRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <div className="h-screen w-screen bg-white flex flex-col justify-center items-center ">
      <SearchBar
        placeholder="Buscar ruta"
        className="absolute inset-x-0 top-0 m-4"
        onSearch={handleSearch}
      />

      <div
        className="w-full h-full mt-14 mb-12 overflow-y-scroll hide-scrollbar"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {data.map((ruta, index) => (
          <CardRuta key={index} ruta={ruta} />
        ))}
        <div className="flex flex-col justify-center items-center ">
          {loading ? (
            <SpinLoading />
          ) : (
            data.length === 0 && <ErrorBlock status="empty" />
          )}
        </div>
      </div>

      <Menu />
    </div>
  )
}
