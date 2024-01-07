import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ServicioSelected } from "../../../actions/servicios";
import { useTranslation } from "react-i18next";

import Swal from "sweetalert2";

export const Servicios = ({ infoActiva, setInfoActiva }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const initialState = {
    id: "",
    categoria: "",
    tipo: "",
    nombre_centro: "",
    img_centro: "",
    ubicacion: "",
    horario: "",
    descripcion: "",
    responsable: "",
    precio: "",
    vista_publica_id: "",
  };

  const [activeButton, setActiveButton] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("Generales");
  const [info, setInfo] = useState(initialState);

  const scrollToElement = (elementId) => {
    var element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);

    if (buttonNumber === 1) {
      setCategoriaSeleccionada("Generales");
    } else if (buttonNumber === 2) {
      setCategoriaSeleccionada("Especializados");
    } else if (buttonNumber === 3) {
      setCategoriaSeleccionada("Servicios de Emergencia y Prevención");
    }
  };

  const vistaPublicaid = useSelector(
    (state) => state.getActiveVist.vistaPublicaObtenida.id_servicio
  );

  const serviciosLista = useSelector((state) => state.getServices.servicios);

  const serviciosCoincidentes = serviciosLista.filter(
    (servicio) => servicio.vista_publica_id === vistaPublicaid
  );

  const ServiceClick = (ServicioID) => {
    dispatch(ServicioSelected(ServicioID));
  };

  const serviceCharged = useSelector((state) => state.getServices.idSelected);

  useEffect(() => {
    const servicioProcesado = serviciosLista.find(
      (servicio) => servicio.id === serviceCharged
    );
    if (servicioProcesado) {
      setInfo(servicioProcesado);
    }
  }, [serviciosLista, serviceCharged]);

  const handleRefresh = (e) => {
    e.preventDefault();

    setInfo(initialState);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Función para eliminar las tildes
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const searchTermNormalized = removeAccents(searchTerm).toLowerCase();

    const filteredResults = serviciosCoincidentes.filter((servicio) =>
      removeAccents(servicio.tipo)
        .toLowerCase()
        .startsWith(searchTermNormalized)
    );

    if (filteredResults.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No se encontraron coincidencias",
        text: "Ingrese una nueva búsqueda.",
      });
    }

    setSearchResults(filteredResults);
  };

  useEffect(() => {
    if (infoActiva) {
      const servicioProcesado = serviciosLista.find(
        (servicio) => servicio.id === serviceCharged
      );
      if (servicioProcesado) {
        setInfo(servicioProcesado);
      }
    }
    setInfoActiva(false);
  }, [infoActiva, setInfoActiva, serviciosLista, serviceCharged]);

  const handleScroll = () => {
    scrollToElement("centrosScroll_2");
  };
  return (
    <>
      <div id="serviciosScroll">
        <div className="ayuda-servicios">
          {t("welcomeServices")} {t("servicesDescription")}
        </div>
      </div>

      <div className="servicio-container">
        <div className="boxDerecha caja">
          <div className="MenuBusqueda">
            <div className="textoMenu">
              <h2> {t("services")}. </h2>
            </div>
            <div className="form-servicios">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder={t("searchByName")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/buscar.png"}
                    alt="Info"
                  />
                </button>
              </form>
            </div>
          </div>

          <div className="MenuServicios">
            <ul>
              <li className="butName">
                <button
                  onClick={() => handleButtonClick(1)}
                  className={`nav-item ${activeButton === 1 ? "active" : ""}`}
                >
                  {t("general")}
                  <hr />
                </button>
              </li>
              <li className="butName">
                <button
                  onClick={() => handleButtonClick(2)}
                  className={`nav-item ${activeButton === 2 ? "active" : ""}`}
                >
                  {t("specialized")}
                  <hr />
                </button>
              </li>
              <li className="butName">
                <button
                  onClick={() => handleButtonClick(3)}
                  className={`nav-item ${activeButton === 3 ? "active" : ""}`}
                >
                  {t("emergencyAndPrevention")}
                  <hr />
                </button>
              </li>
            </ul>
          </div>

          <hr />

          <div className="boxListaServicios">
            <ul>
              {searchResults.length > 0
                ? searchResults.map((result) => {
                    if (result.categoria === categoriaSeleccionada) {
                      return (
                        <li
                          key={result.tipo}
                          onClick={() => ServiceClick(result.id)}
                          className={
                            result.id === serviceCharged ? "selected" : ""
                          }
                        >
                          {result.tipo}
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })
                : serviciosCoincidentes.map((service) => {
                    if (service.categoria === categoriaSeleccionada) {
                      return (
                        <li
                          key={service.tipo}
                          onClick={() => ServiceClick(service.id)}
                          className={
                            service.id === serviceCharged ? "selected" : ""
                          }
                        >
                          {service.tipo}
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
            </ul>
          </div>

          <hr />

          <div className="SelectBox">
            <button onClick={handleRefresh}>
              {t("refresh")}
              <img
                src={process.env.PUBLIC_URL + "assets/refresh.png"}
                alt="Info"
              />
            </button>
          </div>
        </div>
        <div className="boxIzquierda caja">
          <div className="servicioImagen">
            <div className="Smitad">
              {info.img_centro ? (
                <img
                  src={`http://localhost:4000/${info.img_centro} `}
                  alt="Info"
                />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + "/assets/media2.jpg"}
                  alt="Info"
                />
              )}
            </div>
            <div className="Smitad textServicioTitle">
              <ul>
                <li>
                  <span>{t("centerName")}</span>
                </li>
                <li>{info.nombre_centro}</li>
              </ul>
            </div>
          </div>
          <div className="datoServicios">
            <div className="datoscaja">
              <p>
                <span>{t("location")}:</span> {info.ubicacion}
              </p>
              <p>
                <span>{t("description")}:</span> {info.descripcion}
              </p>
              <p>
                <span>{t("responsible")}:</span> {info.responsable}
              </p>
              <p>
                <span>{t("schedule")}:</span> {info.horario}
              </p>
              <p>
                <span>{t("contactUs")}:</span> {info.contacto}
              </p>
            </div>

            <hr />
            <div className="precioservicio">
              <p onClick={handleScroll}>
                <span>{t("seeMore")}...</span>
              </p>
              <p>
                {t("price")}: {info.precio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
