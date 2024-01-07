import React from "react";
import { useSelector } from "react-redux";

export const Informacion = () => {
  const activeVist = useSelector(
    (state) => state.getActiveVist.vistaPublicaObtenida
  );

  return (
    <>
      <div id="informacion">InformacionScroll</div>

      <div className="box-Informador">
        <div className="encima-informacion">
          <div className="alfa-informador">
            <div className="img-hospital">
              <img
                src={`http://localhost:4000/${activeVist.img_informacion} `}
                alt="img_Informacion"
              />
            </div>
            <div className="texto-informador">
              <p>
                {activeVist.texto_informacion ||
                  "Información detallada sobre nuestros servicios y compromiso con tu bienestar. En Health X Health, nos esforzamos por proporcionar atención médica de calidad, promover la prevención y educar a nuestra comunidad sobre la importancia de la salud integral. Explora nuestras instalaciones y descubre cómo estamos dedicados a mejorar tu calidad de vida."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
