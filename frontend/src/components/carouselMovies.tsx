import { SpinLoading } from "antd-mobile"
import Slider from "react-slick"
import { Parada } from "../models/Parada"

type Props = {
  paradas: { parada: Parada }[]
}

export const CarouselMovies: React.FC<Props> = ({ paradas }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
  }

  const todasLasObras = paradas.map((item) => item.parada.obras).flat()

  const obrasUnicas = Array.from(new Set(todasLasObras))

  if (!obrasUnicas[0]) return <SpinLoading />

  return (
    <Slider {...settings}>
      {obrasUnicas.map((obra, index) => (
        <div key={index}>
          <img
            src={obra}
            alt={index.toString()}
            className="w-10/12 m-auto rounded-lg"
          />
        </div>
      ))}
    </Slider>
  )
}
