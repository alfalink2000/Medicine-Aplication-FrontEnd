import { fetchAPIConfig } from "../helpers/fetchAPIConfig";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const GetExtranjeros = () => {
  return async (dispatch) => {
    const resp = await fetchAPIConfig("extranjero/getExtranjeros");
    const body = await resp.json();

    if (body.ok) {
      dispatch(getEx(body.extranjeros));
    } else {
      Swal.fire(
        "Error",
        "Ha ocurrido un error al hacer la peticion a la base de datos ",
        "error"
      );
    }
  };
};

export const getEdadDistribution = () => {
  return async (dispatch) => {
    const resp = await fetchAPIConfig("extranjero/getEdadDistribution");
    const body = await resp.json();

    if (body.ok) {
      dispatch(listPorEdad(body.edadDistribution));
    } else {
      Swal.fire(
        "Error",
        "Ha ocurrido un error al hacer la peticion a la base de datos ",
        "error"
      );
    }
  };
};

export const getPaisesComunes = () => {
  return async (dispatch) => {
    const resp = await fetchAPIConfig("extranjero/getPaisesComunes");
    const body = await resp.json();

    if (body.ok) {
      dispatch(listPaisesComunes(body.paisesComunesConteo));
    } else {
      Swal.fire(
        "Error",
        "Ha ocurrido un error al hacer la peticion a la base de datos ",
        "error"
      );
    }
  };
};

export const getEstadisticas = () => {
  return async (dispatch) => {
    const resp = await fetchAPIConfig(
      "extranjero/obtenerEstadisticasExtranjeros"
    );
    const body = await resp.json();

    if (body.ok) {
      dispatch(
        estadisticasExt({
          extranjerosRegistrados: body.extranjerosRegistrados,
          hombres: body.hombres,
          mujeres: body.mujeres,
          trans: body.trans,
          extranjerosPorIngreso: body.extranjerosPorIngreso,
          localMasAtendido: body.localMasRepetido,
        })
      );
    } else {
      Swal.fire(
        "Error",
        "Ha ocurrido un error al hacer la peticion a la base de datos ",
        "error"
      );
    }
  };
};

export const InsertarExtranjero = ({
  nombre,
  edad,
  pais_residencia,
  nacionalidad,
  genero,
  direccion_particular,
  fecha_nacimiento,
  telefono,
  correo_electronico,
  local_atendido,
  solicitud_ingreso,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchAPIConfig(
        "extranjero/new",
        {
          nombre,
          edad,
          pais_residencia,
          nacionalidad,
          genero,
          direccion_particular,
          fecha_nacimiento,
          telefono,
          correo_electronico,
          local_atendido,
          solicitud_ingreso,
        },
        "POST"
      );

      console.log({
        nombre: nombre,
        edad: edad,
        pais_residencia: pais_residencia,
        nacionalidad: nacionalidad,
        genero: genero,
        direccion_particular: direccion_particular,
        fecha_nacimiento: fecha_nacimiento,
        telefono: telefono,
        correo_electronico: correo_electronico,
        solicitud_ingreso: solicitud_ingreso,
      });
      const body = await resp.json();
      console.log(body);
      if (body.ok) {
        console.log("Se ha insertado el usuario ");
        PostExt({
          id: body.id,
          nombre: body.nombre,
          edad: body.edad,
          pais_residencia: body.pais_residencia,
          nacionalidad: body.nacionalidad,
          genero: body.genero,
          direccion_particular: body.direccion_particular,
          fecha_nacimiento: body.fecha_nacimiento,
          telefono: body.telefono,
          correo_electronico: body.correo_electronico,
          solicitud_ingreso: body.solicitud_ingreso,
        });
        dispatch(GetExtranjeros());
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Usuario registrado en en nuestro sitio exitosamente",
        });
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const UpdateExtranjero = ({
  id,
  nombre,
  edad,
  pais_residencia,
  nacionalidad,
  genero,
  direccion_particular,
  fecha_nacimiento,
  telefono,
  correo_electronico,
  local_atendido,
  solicitud_ingreso,
}) => {
  return async (dispatch) => {
    const resp = await fetchAPIConfig(
      "extranjero/update",
      {
        id,
        nombre,
        edad,
        pais_residencia,
        nacionalidad,
        genero,
        direccion_particular,
        fecha_nacimiento,
        telefono,
        correo_electronico,
        local_atendido,
        solicitud_ingreso,
      },
      "PUT"
    );
    const body = await resp.json();

    console.log("Response body:", body);

    if (body.ok) {
      console.log("Se ha actualizado el usuario ");
      Swal.fire({
        icon: "success",
        title: "Actualizacion exitosa!",
        text: "Usuario Actualizado correctamente",
      });
      PostExt({
        id: body.id,
        nombre: body.nombre,
        edad: body.edad,
        pais_residencia: body.pais_residencia,
        nacionalidad: body.nacionalidad,
        genero: body.genero,
        direccion_particular: body.direccion_particular,
        fecha_nacimiento: body.fecha_nacimiento,
        telefono: body.telefono,
        correo_electronico: body.correo_electronico,
        solicitud_ingreso: body.solicitud_ingreso,
      });
      dispatch(GetExtranjeros());
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const ExtranjeroSelected = (extranjeroID) => {
  return (dispatch) => {
    dispatch(SelectExt(extranjeroID));
  };
};

export const ExtranjeroDeleted = (id) => {
  return async (dispatch) => {
    const resp = await fetchAPIConfig("extranjero/delete", { id }, "DELETE");
    const body = await resp.json();

    if (body.ok) {
      Swal.fire("Success", body.msg, "success");
      dispatch(GetExtranjeros());
    } else {
      Swal.fire(
        "error ",
        "No existe un usuario seleccionado, intente de nuevo ",
        "error"
      );
    }
  };
};

const getEx = (extranjeros) => ({
  type: types.extranjeroUpload,
  payload: extranjeros,
});

const PostExt = (extranjeros) => ({
  type: types.extranjeroAgregado,
  payload: extranjeros,
});

const SelectExt = (id) => ({
  type: types.extranjeroSelected,
  payload: id,
});

const listPorEdad = (edadRango) => ({
  type: types.extranjeroRangoEdad,
  payload: edadRango,
});

const listPaisesComunes = (paises) => ({
  type: types.extranjeroPaisesComunes,
  payload: paises,
});

const estadisticasExt = (estadisticas) => ({
  type: types.extranjeroEstadisticas,
  payload: estadisticas,
});
