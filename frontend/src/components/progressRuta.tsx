import { Divider, ProgressCircle } from "antd-mobile"
import { Link } from "react-router-dom"
import { Ruta } from "../models/Ruta"

type Props = {
  ruta: Ruta
}

export const ProgressRuta: React.FC<Props> = ({ ruta }) => {
  if (!ruta.completadasPorUsuario) return <></>

  const percent = Math.round(
    (ruta.completadasPorUsuario / ruta.paradas.length) * 100
  )

  return (
    <>
      <Divider />
      <Link to={`/home/${ruta.id}`}>
        <div className="flex items-center m-6">
          <ProgressCircle
            percent={percent}
            style={{ "--size": "90px" }}
            className="mr-2"
          >
            <p className="text-2xl">{percent}%</p>
          </ProgressCircle>
          <strong className="flex-grow text-center truncate text-xl w-2/3">
            {ruta.titulo}
          </strong>
        </div>
      </Link>
    </>
  )
}
