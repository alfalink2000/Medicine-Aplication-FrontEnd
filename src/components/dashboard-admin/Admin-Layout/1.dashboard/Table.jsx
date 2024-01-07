import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  ExtranjeroSelected,
  GetExtranjeros,
} from "../../../../actions/extranjeros";

export const Table = ({ searchResults }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetExtranjeros());
  }, [dispatch]);

  const extranjeros = useSelector((state) => state.getExtranjeros.extranjeros);
  const extranjeroCharged = useSelector(
    (state) => state.getExtranjeros.idSelected
  );

  const handleExtranjeroClick = (extranjeroId) => {
    dispatch(ExtranjeroSelected(extranjeroId));
  };

  return (
    <>
      <table id="table-to-download">
        <thead>
          <tr className="header-row">
            <th>#</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Pais Residencia</th>
            <th>Nacionalidad</th>
            <th>Genero</th>
            <th>Direccion</th>
            <th>Fecha Nacimiento</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Local Atendido</th>
            <th>Ingreso</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.some((item) => !!item)
            ? searchResults.map((extranjero, index) => (
                <tr
                  key={extranjero.id}
                  onClick={() => handleExtranjeroClick(extranjero.id)}
                  className={
                    extranjero.id === extranjeroCharged ? "selected" : ""
                  }
                >
                  <td>{index + 1}</td>
                  <td>{extranjero.nombre}</td>
                  <td>{extranjero.edad}</td>
                  <td>{extranjero.pais_residencia}</td>
                  <td>{extranjero.nacionalidad}</td>
                  <td>{extranjero.genero}</td>
                  <td>{extranjero.direccion_particular}</td>
                  <td>{extranjero.fecha_nacimiento}</td>
                  <td>{extranjero.telefono}</td>
                  <td>{extranjero.correo_electronico}</td>
                  <td>{extranjero.local_atendido}</td>
                  <td>{extranjero.solicitud_ingreso}</td>
                </tr>
              ))
            : searchResults.length === 0
            ? extranjeros?.map((extranjero, index) => (
                <tr
                  key={extranjero.id}
                  onClick={() => handleExtranjeroClick(extranjero.id)}
                  className={
                    extranjero.id === extranjeroCharged ? "selected" : ""
                  }
                >
                  <td>{index + 1}</td>
                  <td>{extranjero.nombre}</td>
                  <td>{extranjero.edad}</td>
                  <td>{extranjero.pais_residencia}</td>
                  <td>{extranjero.nacionalidad}</td>
                  <td>{extranjero.genero}</td>
                  <td>{extranjero.direccion_particular}</td>
                  <td>{extranjero.fecha_nacimiento}</td>
                  <td>{extranjero.telefono}</td>
                  <td>{extranjero.correo_electronico}</td>
                  <td>{extranjero.local_atendido}</td>
                  <td>{extranjero.solicitud_ingreso}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </>
  );
};
