import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { UpdateServicio } from "../../../../../actions/servicios";
import { useEffect } from "react";

Modal.setAppElement("#root");

export const ModificarServicio = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const initialState = {
    id: null,
    categoria: "",
    tipo: "",
    nombre_centro: "",
    img_centro: null,
    ubicacion: "",
    horario: "",
    descripcion: "",
    responsable: "",
    contacto: "",
    precio: "",
    vista_publica_id: "",
  };

  const initialStateAntiguo = {
    //Para eliminar la imagen antigua
    id: null,
    categoria: "",
    tipo: "",
    nombre_centro: "",
    img_centro: null,
    ubicacion: "",
    horario: "",
    descripcion: "",
    responsable: "",
    contacto: "",
    precio: "",
    vista_publica_id: "",
  };

  const [values, setValues] = useState(initialState);
  const [valuesAntiguo, setValuesAntiguo] = useState(initialStateAntiguo);
  const [img, setImg] = useState("Img Centro");

  const VistaPublicaCharged = useSelector(
    (state) => state.getPublicVist.idPublicSelected
  );

  const services = useSelector((state) => state.getServices.servicios);

  const serviceCharged = useSelector((state) => state.getServices.idSelected);

  useEffect(() => {
    const servicioActivo =
      services.find((serv) => serv.id === serviceCharged) || {};
    setValues(servicioActivo);
    setValuesAntiguo(servicioActivo);
  }, [services, serviceCharged]);

  const MAX_FILE_SIZE = 1024 * 1024; // 1 MB Para validar las imagenes

  const SelectHandle = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size <= MAX_FILE_SIZE) {
        if (
          selectedFile.type === "image/jpeg" ||
          selectedFile.type === "image/jpg" ||
          selectedFile.type === "image/png"
        ) {
          setImg(selectedFile.name);
          setValues({
            ...values,
            img_centro: selectedFile,
          });
        } else {
          Swal.fire(
            "Carga Incorrecta",
            "El archivo debe ser de tipo JPG o PNG intente de nuevo",
            "warning"
          );
        }
      } else {
        Swal.fire(
          "Carga Incorrecta",
          "El archivo es demasiado grande. Debe ser menor o igual a 1 MB.",
          "warning"
        );
      }
    } else {
      setImg("Img Centro");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const openModal = () => {
    if (serviceCharged) {
      setModalIsOpen(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "No hay servicio seleccionado",
        text: "Por favor, seleccione una servicio antes de continuar.",
      });
    }
  };

  const closeModal = () => {
    const modalContent = document.querySelector(".ReactModal__Content");
    modalContent.style.animation = "fadeOut 0.3s ease-in-out";
    modalContent.addEventListener("animationend", () => {
      setModalIsOpen(false);
      setValues(initialState);
      modalContent.style.animation = ""; // Reset the animation
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlImg = valuesAntiguo.img_centro;

    if (
      values.categoria === "" ||
      values.tipo === "" ||
      values.nombre_centro === "" ||
      values.img_centro === urlImg ||
      values.ubicacion === "" ||
      values.horario === "" ||
      values.descripcion === "" ||
      values.responsable === "" ||
      values.contacto === "" ||
      values.precio === ""
    ) {
      return Swal.fire(
        "Datos Relevantes ",
        "Quedan campos vacios o archivos sin seleccionar ",
        "warning"
      );
    } else {
      const formData = new FormData();

      formData.append("id", serviceCharged);
      formData.append("categoria", values.categoria);
      formData.append("tipo", values.tipo);
      formData.append("nombre_centro", values.nombre_centro);
      formData.append("img_centro", values.img_centro);
      formData.append("ubicacion", values.ubicacion);
      formData.append("horario", values.horario);
      formData.append("descripcion", values.descripcion);
      formData.append("responsable", values.responsable);
      formData.append("contacto", values.contacto);
      formData.append("precio", values.precio);
      formData.append("vista_publica_id", VistaPublicaCharged);
      formData.append("urlImg", urlImg);

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      dispatch(UpdateServicio(formData));

      setValues(initialState);
      setImg("Img Centro");

      closeModal();
    }
  };

  return (
    <div>
      <button type="button" className="modificar-servicio" onClick={openModal}>
        <img
          src={process.env.PUBLIC_URL + "/assets/updateService.svg"}
          alt="actualizarServicio"
        />
      </button>

      {VistaPublicaCharged && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Registro de Extranjero"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              transition: "opacity 0.3s ease-in-out",
            },
            content: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
              animation: "fadeIn 0.3s ease-in-out",
            },
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#555",
              fontSize: "30px",
            }}
          >
            Modificar Servicio
          </h2>
          <form className="form-register">
            <select
              name="categoria"
              value={values.categoria}
              onChange={handleChange}
            >
              <option value="" disabled>
                Categoria
              </option>
              <option value={"Generales"}>Generales</option>
              <option value={"Especializados"}>Especializados</option>
              <option value={"Servicios de Emergencia y Prevención"}>
                Emergencia/Prevención
              </option>
            </select>
            <input
              type="text"
              autoComplete="off"
              name="tipo"
              placeholder="Nombre Servicio"
              value={values.tipo}
              onChange={handleChange}
            />

            <div className="inLineInputImagens Serv">
              <input
                type="text"
                autoComplete="off"
                name="nombre_centro"
                placeholder=" Nombre del centro"
                value={values.nombre_centro}
                onChange={handleChange}
              />
              <div className="imgInput">
                <div className=" ServicioFalso">
                  <label className="file-input-label">
                    <input
                      type="file"
                      name="img_centro"
                      className="file-input"
                      onChange={SelectHandle}
                    />
                  </label>
                  <span className="file-name">{img}</span>
                </div>
              </div>
            </div>
            <input
              type="text"
              autoComplete="off"
              name="ubicacion"
              placeholder="ubicacion"
              value={values.ubicacion}
              onChange={handleChange}
            />
            <input
              type="text"
              autoComplete="off"
              name="horario"
              placeholder="Horario"
              value={values.horario}
              onChange={handleChange}
            />
            <input
              type="text"
              autoComplete="off"
              name="descripcion"
              placeholder="descripcion"
              value={values.descripcion}
              onChange={handleChange}
            />
            <input
              type="text"
              autoComplete="off"
              name="responsable"
              placeholder="responsable"
              value={values.responsable}
              onChange={handleChange}
            />
            <input
              type="number"
              autoComplete="off"
              name="contacto"
              placeholder="Contactenos al #:"
              value={values.contacto}
              onChange={handleChange}
            />
            <input
              type="number"
              autoComplete="off"
              name="precio"
              placeholder="Precio"
              value={values.precio}
              onChange={handleChange}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              <button
                type="button"
                onClick={handleSubmit}
                className="confirmar"
              >
                Confirmar
              </button>
              <button type="button" onClick={closeModal} className="cancelar">
                Cancelar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
