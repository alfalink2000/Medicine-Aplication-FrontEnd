import { fetchAPIConfig } from "../helpers/fetchAPIConfig";
// import { fetchImages } from "../helpers/fetchImages";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const UpdateVistaPublicaSeleccionada = ({
  id,
  titulo_vista,
  titulo_bienvenida,
  texto_bienvenida,
  img_informacion,
  texto_informacion,
  quienes_somos,
  direccion,
  img_1_direccion,
  img_2_direccion,
  img_3_direccion,
  footer,
}) => {
  console.log({
    id,
    titulo_vista,
    titulo_bienvenida,
    texto_bienvenida,
    img_informacion,
    texto_informacion,
    quienes_somos,
    direccion,
    img_1_direccion,
    img_2_direccion,
    img_3_direccion,
    footer,
  });

  return async (dispatch) => {
    try {
      const resp = await fetchAPIConfig(
        "vista_activa/update",
        {
          id,
          titulo_vista,
          titulo_bienvenida,
          texto_bienvenida,
          img_informacion,
          texto_informacion,
          quienes_somos,
          direccion,
          img_1_direccion,
          img_2_direccion,
          img_3_direccion,
          footer,
        },
        "PUT"
      );
      const body = await resp.json();
      // console.log(body);

      if (body.ok) {
        dispatch(vistaActiva(body.vistaPublica));
        Swal.fire({
          icon: "success",
          title: "Seleccion exitosa!",
          text: "Vista Publica Seleccionada satisfactoriamente.",
        });
        console.log("Vista publica activa seleccionada con exito ");
      } else {
        Swal.fire(
          "Error",
          "Ha ocurrido un error al hacer la peticion a la base de datos ",
          "error"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const ObtenerVistaPublicaActiva = () => {
  return async (dispatch) => {
    const resp = await fetchAPIConfig("vista_activa/vista_publica_activa");
    const body = await resp.json();

    if (body.ok) {
      dispatch(vistaObtenida(body.vistaPublicaActiva));
    } else {
      Swal.fire(
        "Error",
        "Ha ocurrido un error al hacer la peticion a la base de datos ",
        "error"
      );
    }
  };
};

const vistaActiva = (vistaActiva) => ({
  type: types.vistaPublicaActiva,
  payload: vistaActiva,
});

const vistaObtenida = (vistaActiva) => ({
  type: types.vistaPublicaActivaObtenida,
  payload: vistaActiva,
});
