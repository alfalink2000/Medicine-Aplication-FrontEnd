import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ServicioSelected } from "../../../actions/servicios";
import { useTranslation } from "react-i18next";

export const Centros = ({ setInfoActiva }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [localSeleccionado, setLocalSeleccionado] = useState("");
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
  const [dropdawnSelected, setDropdawnSelected] = useState("");

  const scrollToElement = (elementId) => {
    var element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLocalChange = (e) => {
    const centroSeleccionado = e.target.value;
    setLocalSeleccionado(centroSeleccionado);

    const serviciosFiltrados = serviciosCoincidentes.filter(
      (servicio) =>
        servicio.nombre_centro.toLowerCase() ===
        centroSeleccionado.toLowerCase()
    );

    setServiciosFiltrados(serviciosFiltrados);
  };

  const vistaPublicaid = useSelector(
    (state) => state.getActiveVist.vistaPublicaObtenida.id_servicio
  );

  const serviciosLista = useSelector((state) => state.getServices.servicios);

  const serviciosCoincidentes = serviciosLista.filter(
    (servicio) => servicio.vista_publica_id === vistaPublicaid
  );

  const nombresCentrosUnicos = {};

  serviciosCoincidentes.forEach((servicio) => {
    const nombreCentro = servicio.nombre_centro.toLowerCase();
    nombresCentrosUnicos[nombreCentro] =
      (nombresCentrosUnicos[nombreCentro] || 0) + 1;
  });

  const centrosUnicos = Object.keys(nombresCentrosUnicos);

  const ServiceClick = (ServicioID) => {
    dispatch(ServicioSelected(ServicioID));
  };

  const serviceCharged = useSelector((state) => state.getServices.idSelected);

  const servicioFiltrado = serviciosCoincidentes.filter(
    (servicio) =>
      servicio.nombre_centro.toLowerCase() === dropdawnSelected.toLowerCase()
  );

  let imgCentro;

  if (servicioFiltrado.length > 0) {
    imgCentro = servicioFiltrado[0].img_centro;
  }

  const handleMorInfo = (e) => {
    e.preventDefault();

    if (serviceCharged) {
      scrollToElement("serviciosScroll");
    }

    setInfoActiva(true);
  };

  return (
    <>
      <div id="centrosScroll">centrosScroll</div>
      <div id="centrosScroll_2">
        <div className="ayuda_centros">
          {t("welcomeCenters")} {t("centersDescription")}
        </div>
      </div>

      <div className="box-centros-mayor">
        <div className="titulo_centro_img">
          <h2>
            {t("centers")}
            <span>.</span>
          </h2>
        </div>
        <div className="box-centro-caja">
          <div className="Cmitad ">
            <div className="centro_imagenes">
              {imgCentro ? (
                <img src={`http://localhost:4000/${imgCentro} `} alt="Info" />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + "/assets/centroFijo2.jpg"}
                  alt="Info"
                />
              )}
            </div>
          </div>
          <div className="Cmitad">
            <div className="derecha_centros">
              <div className="dropdown-container">
                <select
                  name="local"
                  value={localSeleccionado}
                  onChange={handleLocalChange}
                  onClick={() => setDropdawnSelected(localSeleccionado)}
                >
                  <option value="" disabled>
                    {t("availableCenters")}
                  </option>
                  {centrosUnicos.map((nombreCentro, index) => (
                    <option key={index} value={nombreCentro}>
                      {nombreCentro}
                    </option>
                  ))}
                </select>

                <hr />

                <div className="espacio_centro_servicios">
                  <h5>Lista</h5>
                  <ul>
                    {serviciosFiltrados.map((servicio, index) => (
                      <li
                        key={index}
                        onClick={() => ServiceClick(servicio.id)}
                        className={
                          servicio.id === serviceCharged ? "selected" : ""
                        }
                      >
                        {servicio.tipo}
                      </li>
                    ))}
                  </ul>
                </div>

                <hr />
              </div>
              <div className="centro_button">
                <button onClick={handleMorInfo}> {t("get")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
