import React from "react";
import { Table } from "../1.dashboard/Table";
import { ModalRegister } from "./ModalRegister";
import { ModalUpdate } from "./ModalUpdate";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ExtranjeroDeleted } from "../../../../actions/extranjeros";
import { useState } from "react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const WorkBench = () => {
  const dispatch = useDispatch();
  const extranjeroCharged = useSelector(
    (state) => state.getExtranjeros.idSelected
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const listaExtranjeros = useSelector(
    (state) => state.getExtranjeros.extranjeros
  );

  const handleSearchB = (e) => {
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

  const handleDelete = () => {
    if (!extranjeroCharged) {
      Swal.fire({
        icon: "warning",
        title: "No hay usuario seleccionado",
        text: "Por favor, seleccione un usuario antes de continuar.",
      });
      return;
    } else {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará al usuario seleccionado",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(ExtranjeroDeleted(extranjeroCharged));
        }
      });
    }
  };

  const handleDownload = () => {
    const input = document.getElementById("table-to-download");

    // Aplica algunos estilos a la tabla antes de capturarla como una imagen
    input.style.fontFamily = "Arial, sans-serif";
    input.style.borderCollapse = "collapse";
    input.style.width = "100%";

    let targetList = listaExtranjeros;

    // Verifica si hay resultados de búsqueda y los utiliza si existen
    if (searchResults.length > 0) {
      targetList = searchResults;
    }
    console.log("Descarga Completa:" + targetList);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      // Agrega un título al PDF
      pdf.text("Descarga de Tabla", 10, 10);

      // Ajusta el ancho y alto según sea necesario
      const ancho = 190;
      const alto = (ancho / input.offsetWidth) * input.offsetHeight;

      pdf.addImage(imgData, "PNG", 10, 20, ancho, alto);
      pdf.save("tabla.pdf");

      // Restablece los estilos después de capturar la imagen
      input.style = "";
    });
  };

  return (
    <div className="container workbench">
      <div className=" row workbench-box">
        <div className="offset-lg-2 offset-md-2 offset-sm-1 col-sm-11 col-md-11 col-lg-10">
          <div className="workbench-box-interno ">
            <div className="workbench-info-green">
              Banco de trabajo para gestionar usuarios y administrar todo tipo
              de informaciones relacionadas !
            </div>

            <div className="form-workbench">
              <h2>
                Workbench<span>.</span>
              </h2>

              <form onSubmit={handleSearchB}>
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

            <div className="table-workbench">
              <Table searchResults={searchResults} />
            </div>

            <div className="actions-workbench">
              <ul>
                <li>
                  <ModalRegister />
                </li>

                <li>
                  <ModalUpdate />
                </li>

                <li>
                  <button onClick={handleDelete}>
                    <img
                      src={process.env.PUBLIC_URL + "/assets/delete-user.png"}
                      alt="Delete"
                    />
                    <label>Eliminar</label>
                  </button>
                </li>

                <li>
                  <button onClick={handleDownload}>
                    <img
                      src={process.env.PUBLIC_URL + "/assets/download.png"}
                      alt="download"
                    />
                    <label>Download</label>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
