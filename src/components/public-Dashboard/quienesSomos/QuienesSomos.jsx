import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export const QuienesSomos = () => {
  const activeVist = useSelector(
    (state) => state.getActiveVist.vistaPublicaObtenida
  );

  const { t } = useTranslation();

  return (
    <>
      <div id="QuienesSomosScroll_1">QuienesSomosScroll</div>
      <div id="QuienesSomosScroll_2">QuienesSomosScroll</div>

      <div className="box-quienesSomos">
        <div className="div-quienesSomos QSMitad">
          <div className="div-quienesSomos-arriba">
            <h1>{t("whoWeAre")}</h1>
            <p>{activeVist.quienes_somos}</p>
          </div>

          <div className="div-quienesSomos-abajo">
            <div className="div-quienesSomos-abajo-texto">
              <div className="div-quienesSomos-abajo-texto-caja">
                <h4>{t("address")}</h4>
                <p>{activeVist.direccion}</p>
              </div>
            </div>

            <div className="div-quienesSomos-abajo-container">
              <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                  <div className="carousel-item active carousel-uno">
                    <img
                      src={`http://localhost:4000/${activeVist.img_1_direccion} `}
                      alt="imgCarrousel"
                      className="imgCarrousel1"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={`http://localhost:4000/${activeVist.img_2_direccion} `}
                      alt="imgCarrousel"
                      className="imgCarrousel2"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={`http://localhost:4000/${activeVist.img_3_direccion} `}
                      alt="imgCarrousel"
                      className="imgCarrousel3"
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="imagenes-personalizadas QSMitad">
          <img
            src={process.env.PUBLIC_URL + "/assets/arriba1.jpg"}
            alt="arriba"
            className="primera-image "
          />
          <img
            src={process.env.PUBLIC_URL + "/assets/central2.jpg"}
            alt="central"
            className="segunda-image "
          />
          <img
            src={process.env.PUBLIC_URL + "/assets/abajo1.jpg"}
            alt="abajo"
            className="tercera-image "
          />
        </div>
      </div>
    </>
  );
};
