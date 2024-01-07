import React from "react";
import { useSelector } from "react-redux";

export const Bienvenida = () => {
  const activeVist = useSelector(
    (state) => state.getActiveVist.vistaPublicaObtenida
  );

  return (
    <>
      <div id="start">Start</div>

      <div className="box-informacion-publica animate__animated animate__fadeIn">
        <div className="doc-img">
          <img
            className="animate__animated animate__fadeIn"
            src={process.env.PUBLIC_URL + "/assets/doc3.jpg"}
            alt="docImg"
          />
        </div>

        <div className="box-informativo-grande">
          <div className="text-informacion-publico">
            <div>
              <h1 className="animate__animated animate__fadeInLeft">
                {activeVist.titulo_bienvenida || "Bienvenido a Health X Health"}
              </h1>
              <p className="animate__animated animate__bounceInDown">
                {activeVist.texto_bienvenida ||
                  "Descubre un espacio dedicado a tu bienestar físico y mental. En Health X Health, nos esforzamos por brindar atención integral y personalizada para que alcances tu máximo potencial de salud.  Nuestra misión es ser tu aliado en el camino hacia un estilo de vida saludable y equilibrado."}
              </p>
            </div>
          </div>

          <div className="redes">
            <button>
              <img
                className="animate__animated animate__bounceInRight"
                src={process.env.PUBLIC_URL + "/assets/face.png"}
                alt="face"
              />
            </button>

            <button>
              <img
                className="mail animate__animated animate__bounceInRight"
                src={process.env.PUBLIC_URL + "/assets/contact.png"}
                alt="msage"
              />
            </button>

            <button>
              <img
                className=" twiter animate__animated animate__bounceInRight"
                src={process.env.PUBLIC_URL + "/assets/twiter.png"}
                alt="twiter"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
