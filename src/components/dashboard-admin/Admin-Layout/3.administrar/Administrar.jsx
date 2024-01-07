import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  DeleteVistaPublica,
  GetListVistasPublicas,
  VistaPublicaSeleccionada,
} from "../../../../actions/vista_publica";
import { useState } from "react";
import {
  ObtenerVistaPublicaActiva,
  UpdateVistaPublicaSeleccionada,
} from "../../../../actions/vista_publica_activa";
import Swal from "sweetalert2";
import { ModalRegister } from "./ModalAgregar";
import { ModalUpdateVP } from "./ModalUpdateVP";

export const Administrar = () => {
  const dispatch = useDispatch();

  const initialState = {
    id: "",
    titulo_vista: "",
    titulo_bienvenida: "",
    texto_bienvenida: "",
    img_informacion: "",
    texto_informacion: "",
    quienes_somos: "",
    direccion: "",
    img_1_direccion: "",
    img_2_direccion: "",
    img_3_direccion: "",
    footer: "",
  };

  const [values, setValues] = useState(initialState);
  const [vistaObtenidaTitle, setVistaObtenidaTitle] = useState("");

  const vistasPublicas = useSelector(
    (state) => state.getPublicVist.vistasPublicas
  );

  const VistaPublicaObtenida = useSelector(
    (state) => state.getActiveVist.vistaPublicaObtenida.titulo_vista
  );

  useEffect(() => {
    dispatch(ObtenerVistaPublicaActiva());
    setVistaObtenidaTitle(VistaPublicaObtenida);
  }, [dispatch, VistaPublicaObtenida]);

  const VistaPublicaCharged = useSelector(
    (state) => state.getPublicVist.idPublicSelected
  );

  useEffect(() => {
    const vistActiva =
      vistasPublicas.find((vista) => vista.id === VistaPublicaCharged) || {};
    setValues(vistActiva);
  }, [VistaPublicaCharged, vistasPublicas]);

  useEffect(() => {
    dispatch(GetListVistasPublicas());
  }, [dispatch]);

  const handleSelectedClick = (vistaID) => {
    dispatch(VistaPublicaSeleccionada(vistaID));
  };

  const handleSelect = (e) => {
    e.preventDefault();

    if (VistaPublicaCharged) {
      dispatch(
        UpdateVistaPublicaSeleccionada({
          id: values.id,
          titulo_vista: values.titulo_vista,
          titulo_bienvenida: values.titulo_bienvenida,
          texto_bienvenida: values.texto_bienvenida,
          img_informacion: values.img_informacion,
          texto_informacion: values.texto_informacion,
          quienes_somos: values.quienes_somos,
          direccion: values.direccion,
          img_1_direccion: values.img_1_direccion,
          img_2_direccion: values.img_2_direccion,
          img_3_direccion: values.img_3_direccion,
          footer: values.footer,
        })
      );
    } else {
      Swal.fire("warning", "Seleccione un campo", "warning");
    }
  };

  const handleDelete = () => {
    const urlImg = values.img_informacion;
    const urlImg1 = values.img_1_direccion;
    const urlImg2 = values.img_2_direccion;
    const urlImg3 = values.img_3_direccion;

    if (!VistaPublicaCharged) {
      Swal.fire({
        icon: "warning",
        title: "No hay vista seleccionado",
        text: "Por favor, seleccione una vista antes de continuar.",
      });
      return;
    } else {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará la vista seleccionada",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            DeleteVistaPublica(
              VistaPublicaCharged,
              urlImg,
              urlImg1,
              urlImg2,
              urlImg3
            )
          );
        }
      });
    }
  };

  return (
    <div className="container-fluid container-administrar ">
      <div className="row row-administrar">
        <div className="caja-administrativa offset-lg-3 offset-md-3 offset-sm-2 col-sm-8 col-md-8 col-lg-8">
          <div className="col-6 izquierda-administrativa">
            <h2>Vistas Publicas</h2>
            <hr />

            <div className="ListVistasPublicasbox">
              <ul>
                {vistasPublicas?.map((vista) => (
                  <li
                    key={vista.id}
                    onClick={() => handleSelectedClick(vista.id)}
                    className={
                      vista.id === VistaPublicaCharged
                        ? "selected"
                        : "" || vista.titulo_vista === vistaObtenidaTitle
                        ? "active"
                        : ""
                    }
                  >
                    {vista.titulo_vista}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-6 derecha-administrativa">
            <div className="info-box-administrativa-Caja">
              <h2>Informacion</h2>
              <hr />
              <div className="info-box-administrativa">
                <p>
                  En esta vista puedes agregar, modificar y eliminar registros
                  del contenido que sera mostrado publicamente
                </p>
              </div>
            </div>

            <div className="actions-box-administrativa">
              <h4>Acciones</h4>
              <hr />

              <div className="buttons-box-administrativa">
                <button
                  className="modal-button"
                  onClick={handleSelect}
                  style={{ width: "12vw" }}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/assets/select.png"}
                    alt="logoImagen"
                  />
                  <span> Seleccionar</span>
                </button>

                <ModalRegister />

                <ModalUpdateVP />

                <button
                  onClick={handleDelete}
                  className="modal-button"
                  style={{ width: "12vw" }}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/assets/delete.png"}
                    alt="logoImagen"
                  />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>

            <div className="ayuda-administrativa">
              <Link to="/admin-dashboard/help">
                <button>
                  <img
                    src={process.env.PUBLIC_URL + "/assets/help.png"}
                    alt="logoImagen"
                  />
                  <span>Ayuda Administracion</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
