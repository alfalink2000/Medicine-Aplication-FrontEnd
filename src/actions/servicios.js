import { fetchAPIConfig } from "../helpers/fetchAPIConfig";
import { fetchPublic } from "../helpers/fetchPublic";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const GetServicios = () => {
  return async (dispatch) => {
    const resp = await fetchAPIConfig("services/getServices");
    const body = await resp.json();

    // console.log("Response body:", body);

    if (body.ok) {
      dispatch(getServ(body.servicios));
    } else {
      Swal.fire(
        "Error",
        "Ha ocurrido un error al hacer la peticion a la base de datos ",
        "error"
      );
    }
  };
};

export const InsertarServicio = (formData) => {
  return async (dispatch) => {
    const resp = await fetchPublic("services/new", formData, "POST");
    const body = await resp.json();

    if (body.ok) {
      console.log("Se ha insertado el usuario ");
      InserServ(body.servicio);
      dispatch(GetServicios());
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Servicio registrado en la vista satisfactoriamente",
      });
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const UpdateServicio = (formData) => {
  return async (dispatch) => {
    const resp = await fetchPublic("services/update", formData, "PUT");
    const body = await resp.json();

    if (body.ok) {
      console.log("Se ha actualizado el usuario ");
      Swal.fire({
        icon: "success",
        title: "Actualizacion exitosa!",
        text: "Usuario Actualizado correctamente",
      });
      dispatch(GetServicios());
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const ServicioSelected = (ServicioID) => {
  return (dispatch) => {
    dispatch(SelectServ(ServicioID));
  };
};

export const ServicioDeleted = (id, urlImg) => {
  return async (dispatch) => {
    const resp = await fetchAPIConfig(
      "services/delete",
      { id, urlImg },
      "DELETE"
    );
    const body = await resp.json();

    if (body.ok) {
      Swal.fire("Success", body.msg, "success");
      dispatch(GetServicios());
    } else {
      Swal.fire(
        "error ",
        "No existe un usuario seleccionado, intente de nuevo ",
        "error"
      );
    }
  };
};

const InserServ = (servicio) => ({
  type: types.listaServAgregado,
  payload: servicio,
});

const getServ = (servicio) => ({
  type: types.listaServicos,
  payload: servicio,
});

const SelectServ = (id) => ({
  type: types.listaServSelected,
  payload: id,
});
