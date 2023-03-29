import { SearchBar, SpinLoading } from "antd-mobile"
import { Menu } from "../components/menu"
import { CardRuta } from "../components/cardRuta"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Ruta } from "../models/Ruta"

export const Home = () => {
  const [data, setData] = useState<Array<Ruta>>([])
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const hasMountedRef = useRef(false)

  const fetchData = async (skip: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/ruta`, { params: { skip } })
      const rutasArray: Array<Ruta> = response.data
      console.log(rutasArray)
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

  useEffect(() => {
    if (!hasMountedRef.current) {
      fetchData(0)
      hasMountedRef.current = true
    }
  }, [])

  if (data.length === 0) return <SpinLoading />

  return (
    <div className="h-screen w-screen bg-white flex flex-col justify-center items-center ">
      <SearchBar
        placeholder="Buscar ruta"
        className="absolute inset-x-0 top-0 m-4"
      />

      <div
        className="w-full h-full mt-14 mb-12 overflow-y-scroll"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {data.map((ruta,index) => (
          <CardRuta key={index} ruta={ruta} />
        ))}
        {loading && <SpinLoading />}
      </div>

      <Menu />
    </div>
  )
}
