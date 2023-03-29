import { Button } from "antd-mobile"
import { LocationFill, StarOutline } from "antd-mobile-icons"
import { Ruta } from "../models/Ruta"
import { CarouselMovies } from "./carouselMovies"

type Props = {
  ruta: Ruta
}

export const CardRuta: React.FC<Props> = ({ ruta }) => {
  return (
    <div className="rounded-lg border-2 border-black m-4">
      <div className="relative">
        <img
          src={ruta.paradas[0].parada.imagenes[1]}
          alt="MovieRoute"
          className="object-cover w-full border-b-2 border-black rounded-t-lg h-28"
        />
        <Button
          block
          shape="rounded"
          className="absolute -bottom-5 left-1/3 bg-primary text-black w-1/3 border-primary"
        >
          Ver más
        </Button>
      </div>
      <div className="mt-8 mx-4 mb-2">
        <div className="flex items-center justify-between">
          <strong className="w-6/8 truncate text-xl">
            {ruta.titulo}
          </strong>
          <StarOutline className="w-1/8 text-3xl mr-1" />
        </div>
        <div className="flex items-center mt-1">
          <LocationFill className="text-2xl" />
          <p className="text-base">{ruta.localizacion}</p>
        </div>
      </div>
      <div className="w-full mt-4 mb-2">
        <CarouselMovies paradas={ruta.paradas}/>
      </div>
    </div>
  )
}
