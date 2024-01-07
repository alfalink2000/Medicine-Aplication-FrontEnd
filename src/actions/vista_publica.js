import { fetchAPIConfig } from "../helpers/fetchAPIConfig";
import { fetchPublic } from "../helpers/fetchPublic";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const GetListVistasPublicas = () => {
  return async (dispatch) => {
    const resp = await fetchAPIConfig("vista_publica/vista_publica");
    const body = await resp.json();

    if (body.ok) {
      dispatch(getVistasPublicas(body.vistasPublicas));
    } else {
      Swal.fire(
        "Error",
        "Ha ocurrido un error al hacer la peticion a la base de datos ",
        "error"
      );
    }
  };
};

export const VistaPublicaSeleccionada = (vistaID) => {
  return (dispatch) => {
    dispatch(SelectVistaPublica(vistaID));
  };
};

export const InsertVistaPublica = (formData) => {
  return async (dispatch) => {
    const resp = await fetchPublic("vista_publica/new", formData, "POST");

    const body = await resp.json();

    if (body.ok) {
      dispatch(vistaInsert(body.vistaPublica));
      GetListVistasPublicas();
      Swal.fire({
        icon: "success",
        title: "Formulario Ingresado!",
        text: "Vista Publica Insertada satisfactoriamente.",
      });
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const ActualizarVistaPublica = (formData) => {
  return async (dispatch) => {
    const resp = await fetchPublic("vista_publica/update", formData, "PUT");

    const body = await resp.json();

    if (body.ok) {
      dispatch(GetListVistasPublicas());
      Swal.fire({
        icon: "success",
        title: "Formulario Actualizado!",
        text: "Vista Publica Actualizada satisfactoriamente.",
      });
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const DeleteVistaPublica = (id, urlImg, urlImg1, urlImg2, urlImg3) => {
  return async (dispatch) => {
    const resp = await fetchAPIConfig(
      "vista_publica/delete",
      { id, urlImg, urlImg1, urlImg2, urlImg3 },
      "DELETE"
    );
    const body = await resp.json();

    if (body.ok) {
      Swal.fire("Success", body.msg, "success");
      dispatch(GetListVistasPublicas());
    } else {
      Swal.fire(
        "error ",
        "No existe un usuario seleccionado, intente de nuevo ",
        "error"
      );
    }
  };
};

const vistaInsert = (vistasPublica) => ({
  type: types.vistaPublicaInsertada,
  payload: vistasPublica,
});

const getVistasPublicas = (vistasPublicas) => ({
  type: types.listaVistasPublicas,
  payload: vistasPublicas,
});

const SelectVistaPublica = (id) => ({
  type: types.vistaPublicaSelected,
  payload: id,
});
