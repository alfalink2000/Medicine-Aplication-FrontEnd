import React, { useEffect, useState } from "react";
import { Table } from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { PieChart } from "react-minimal-pie-chart";
import { easeExpInOut } from "d3-ease";
import {
  getEdadDistribution,
  getEstadisticas,
  getPaisesComunes,
} from "../../../../actions/extranjeros";
import Swal from "sweetalert2";

export const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEdadDistribution());
    dispatch(getPaisesComunes());
    dispatch(getEstadisticas());
  }, [dispatch]);

  const rangoEdades = useSelector((state) => state.getExtranjeros.rangoEdad);
  const paisesComunes = useSelector(
    (state) => state.getExtranjeros.paisesComunes
  );
  const extranjeros = useSelector((state) => state.getExtranjeros.estadisticas);
  const listaExtranjeros = useSelector(
    (state) => state.getExtranjeros.extranjeros
  );

  const [chartData, setChartData] = useState([]);
  const [chartPais, setChartPais] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const colors = ["#0aa3a8", "#3ae406", "#5733FF", "#8808a1"];

    const prepareRangoEdad = () => {
      if (rangoEdades && typeof rangoEdades === "object") {
        const data = Object.keys(rangoEdades).map((range, index) => {
          const cantidad = rangoEdades[range];

          return {
            // title: `${cantidad}`,
            value: cantidad,
            color: colors[index],
          };
        });

        setChartData(data);
      }
    };

    prepareRangoEdad();
  }, [rangoEdades]);

  useEffect(() => {
    const colors = ["#0aa3a8", "#3ae406", "#5733FF", "#8808a1", "#c50850"];

    const preparePaisesComunes = () => {
      if (paisesComunes) {
        const data = paisesComunes.map((item, index) => {
          const cantidad = item.cantidad;

          return {
            // title: `${cantidad}`,
            value: cantidad,
            color: colors[index],
          };
        });

        setChartPais(data);
      }
    };

    preparePaisesComunes();
  }, [paisesComunes]);

  const colors = ["#0aa3a8", "#3ae406", "#5733FF", "#8808a1", "#c50850"];

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredResults = listaExtranjeros.filter((extranjero) =>
      extranjero.nombre.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    if (filteredResults.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "No se encontraron coincidencias",
        text: "Ingrese una nueva busqueda.",
      });
    }

    setSearchResults(filteredResults);
  };

  return (
    <div className="container-fluid  container-dashboard">
      <div className="row size">
        <div className="dashboard-box  offset-lg-2 offset-md-2 offset-sm-1 col-sm-11 col-md-11 col-lg-11">
          <div className="row">
            <div className="arriba-dashboard col-12">
              <div className="info-box-dashboard col-sm-12 col-md-4 col-lg-4">
                <div className="info-box-interno Primero">
                  <h4>Rangos de Edad</h4>
                  <div className="pastelbox">
                    <PieChart
                      data={chartData}
                      label={({ dataEntry }) => dataEntry.title}
                      className="pastel"
                      animate={true}
                      animationDuration={2000}
                      animationEasingFn={easeExpInOut}
                      startAngle={0}
                      totalValue={10}
                    />

                    <ul>
                      <li>
                        <div className="infoPastelbebe">b</div>
                        <div className="pastelTexto">
                          <span>Niño(0-14)</span>
                        </div>
                      </li>
                      <li>
                        <div className="infoPasteljoven">j</div>
                        <div className="pastelTexto">
                          <span>Joven(15-24)</span>
                        </div>
                      </li>
                      <li>
                        <div className="infoPasteladulto">a</div>
                        <div className="pastelTexto">
                          <span>Adulto(25-54)</span>
                        </div>
                      </li>
                      <li>
                        <div className="infoPastelanciano">m</div>
                        <div className="pastelTexto">
                          <span>Mayor(55-64)</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="info-box-dashboard col-sm-12 col-md-4 col-lg-4">
                <div className="info-box-interno ">
                  <h4>Paises Más Comunes</h4>
                  <div className="pastelbox paisesComunes">
                    <PieChart
                      data={chartPais}
                      label={({ dataEntry }) => dataEntry.title}
                      className="pastel"
                    />

                    <ul className="paisesComunesUL">
                      {paisesComunes.slice(0, 5).map((item, index) => (
                        <li key={index}>
                          <div
                            className="infoPastelPaisesComunes"
                            style={{ backgroundColor: colors[index] }} // Usar el color correspondiente
                          >
                            a
                          </div>
                          <div>
                            <span>{item.pais_residencia}</span>
                            {/* Mostrar el nombre del país */}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="info-box-dashboard col-sm-12 col-md-4 col-lg-4">
                <div className="info-box-interno Estadisicas">
                  <h4>Estadísticas</h4>
                  <ul>
                    <li>
                      Total de Extranjeros:
                      <span>{extranjeros.extranjerosRegistrados}</span>
                    </li>
                    <li>
                      Total de Ingresados:
                      <span>{extranjeros.extranjerosPorIngreso}</span>
                    </li>
                    <li>
                      Total de G.Masculino:<span>{extranjeros.hombres}</span>
                    </li>
                    <li>
                      Total de G.Femenino: <span>{extranjeros.mujeres}</span>
                    </li>
                    <li>
                      Total de Trans Genero: <span>{extranjeros.trans}</span>
                    </li>
                    <li>
                      Local Mayor:<span>{extranjeros.localMasAtendido}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="abajo-dashboard">
            <div className="abajo-box-dashboard">
              <div className="filter">
                <div className="texto-dashboard">
                  <h3> Datos de Pacientes Atendidos</h3>
                </div>

                <div className="form-dashboard">
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Buscar por nombre"
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

              <div className="table-box">
                <Table searchResults={searchResults} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
