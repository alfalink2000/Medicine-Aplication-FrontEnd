import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import {
  GetServicios,
  ServicioDeleted,
  ServicioSelected,
} from "../../../../actions/servicios";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ActualizarVistaPublica } from "../../../../actions/vista_publica";
import { AgregarServicio } from "./serviciosCrud/AgregarServicio";
import { ModificarServicio } from "./serviciosCrud/ModificarServicio";

Modal.setAppElement("#root");

export const ModalUpdateVP = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const initialState = {
    //Para manejar las vistas publicas
    id: null,
    titulo_vista: "",
    titulo_bienvenida: "",
    texto_bienvenida: "",
    img_informacion: null,
    texto_informacion: "",
    quienes_somos: "",
    direccion: "",
    img_1_direccion: null,
    img_2_direccion: null,
    img_3_direccion: null,
    footer: "",
  };

  const initialStateAntiguo = {
    //Para eliminar las imagenes por las rutas antiguas
    id: null,
    titulo_vista: "",
    titulo_bienvenida: "",
    texto_bienvenida: "",
    img_informacion: null,
    texto_informacion: "",
    quienes_somos: "",
    direccion: "",
    img_1_direccion: null,
    img_2_direccion: null,
    img_3_direccion: null,
    footer: "",
  };

  const initialStateServicio = {
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
    precio: "",
    vista_publica_id: "",
  };

  const [values, setValues] = useState(initialState);
  const [valuesAntiguo, setValuesAntiguo] = useState(initialStateAntiguo);
  const [valuesServicio, setValuesServicio] = useState(initialStateServicio);
  const [modalEdit, setModalEditIsOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [textLength, setTextLength] = useState({
    titulo_vista: 0,
    titulo_bienvenida: 0,
    texto_bienvenida: 0,
    texto_informacion: 0,
    quienes_somos: 0,
    direccion: 0,
    footer: 0,
  });
  const [charLimits] = useState({
    titulo_vista: 35,
    titulo_bienvenida: 35,
    texto_bienvenida: 415,
    texto_informacion: 700,
    quienes_somos: 1400,
    direccion: 287,
    footer: 450,
  });

  const VistaPublicaCharged = useSelector(
    (state) => state.getPublicVist.idPublicSelected
  );

  const vistasPublicas = useSelector(
    (state) => state.getPublicVist.vistasPublicas
  );

  const services = useSelector((state) => state.getServices.servicios);

  const serviceCharged = useSelector((state) => state.getServices.idSelected);

  useEffect(() => {
    const servicioActivo =
      services.find((serv) => serv.id === serviceCharged) || {};
    setValuesServicio(servicioActivo);
  }, [services, serviceCharged]);

  const ServiceClick = (ServicioID) => {
    dispatch(ServicioSelected(ServicioID));
  };

  useEffect(() => {
    const vistActiva =
      vistasPublicas.find((vista) => vista.id === VistaPublicaCharged) || {};
    setValues(vistActiva);
    setValuesAntiguo(vistActiva);
  }, [VistaPublicaCharged, vistasPublicas]);

  useEffect(() => {
    dispatch(GetServicios());
  }, [dispatch]);

  // Función para manejar cambios en los textarea y actualizar la longitud del texto
  const handleTextareaChange = (e) => {
    const text = e.target.value;
    const inputName = e.target.name;
    setTextLength({
      ...textLength,
      [inputName]: text.length,
    });
    const charLimit = charLimits[inputName];
    if (text.length > charLimit) {
      return Swal.fire(
        "Caracteres no permitidos",
        "Se ha excedido el límite de caracteres",
        "warning"
      );
    }
    // Actualiza el valor editado
    setEditValue(text);
  };

  // Agrega un efecto secundario para actualizar textLength
  useEffect(() => {
    if (editingField) {
      setTextLength((prevTextLength) => ({
        ...prevTextLength,
        [editingField]: editValue.length,
      }));
    }
  }, [editingField, editValue]);

  const openEditModal = (fieldName, fieldValue) => {
    setEditingField(fieldName);
    setEditValue(fieldValue);
    setModalEditIsOpen(true);
  };

  const closeEditModal = () => {
    const inputName = editingField; // Nombre del campo que se está editando
    if (inputName !== null) {
      if (editValue.length <= charLimits[inputName]) {
        // Si la longitud del texto es menor o igual al máximo permitido
        setValues({
          ...values,
          [inputName]: editValue,
        });
      } else {
        // Si se supera el límite, muestra la alerta
        Swal.fire(
          "Caracteres no permitidos",
          "Se ha excedido el límite de caracteres",
          "warning"
        );
      }
    }
    setModalEditIsOpen(false);
    setEditingField(null);
  };

  const [spam, setSpam] = useState("Img Informacion");
  const [spam1, setSpam1] = useState("Img Direccion");
  const [spam2, setSpam2] = useState("Img Direccion");
  const [spam3, setSpam3] = useState("Img Direccion");

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
          setSpam(selectedFile.name);
          setValues({
            ...values,
            img_informacion: selectedFile,
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
      setSpam("Img Informacion");
    }
  };

  const SelectHandleimg1 = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size <= MAX_FILE_SIZE) {
        if (
          selectedFile.type === "image/jpeg" ||
          selectedFile.type === "image/jpg" ||
          selectedFile.type === "image/png"
        ) {
          setSpam1(selectedFile.name);
          setValues({
            ...values,
            img_1_direccion: selectedFile,
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
      setSpam1("Img Informacion");
    }
  };

  const SelectHandleimg2 = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size <= MAX_FILE_SIZE) {
        if (
          selectedFile.type === "image/jpeg" ||
          selectedFile.type === "image/jpg" ||
          selectedFile.type === "image/png"
        ) {
          setSpam2(selectedFile.name);
          setValues({
            ...values,
            img_2_direccion: selectedFile,
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
      setSpam2("Img Informacion");
    }
  };

  const SelectHandleimg3 = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size <= MAX_FILE_SIZE) {
        if (
          selectedFile.type === "image/jpeg" ||
          selectedFile.type === "image/jpg" ||
          selectedFile.type === "image/png"
        ) {
          setSpam3(selectedFile.name);
          setValues({
            ...values,
            img_3_direccion: selectedFile,
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
      setSpam3("Img Informacion");
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
    if (VistaPublicaCharged) {
      setModalIsOpen(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "No hay vista seleccionada",
        text: "Por favor, seleccione una vista antes de continuar.",
      });
    }
  };

  const closeModal = () => {
    const modalContent = document.querySelector(".ReactModal__Content");
    modalContent.style.animation = "fadeOut 0.3s ease-in-out";
    modalContent.addEventListener("animationend", () => {
      setModalIsOpen(false);
      modalContent.style.animation = ""; // Reset the animation
    });
  };

  const handleDelete = () => {
    const urlImg = valuesServicio.img_centro;

    if (!serviceCharged) {
      Swal.fire({
        icon: "warning",
        title: "No hay servicio seleccionado",
        text: "Por favor, seleccione un usuario antes de continuar.",
      });
      return;
    } else {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el servicio seleccionado",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(ServicioDeleted(serviceCharged, urlImg));
        }
      });
    }
  };

  const ConfirmarFormulario = () => {
    const urlImg = valuesAntiguo.img_informacion;
    const urlImg1 = valuesAntiguo.img_1_direccion;
    const urlImg2 = valuesAntiguo.img_2_direccion;
    const urlImg3 = valuesAntiguo.img_3_direccion;

    if (
      values.id == null ||
      values.img_informacion === urlImg ||
      values.img_1_direccion === urlImg1 ||
      values.img_2_direccion === urlImg2 ||
      values.img_3_direccion === urlImg3 ||
      values.titulo_vista === "" ||
      values.texto_bienvenida === "" ||
      values.texto_bienvenida === "" ||
      values.texto_informacion === "" ||
      values.quienes_somos === "" ||
      values.direccion === "" ||
      values.footer === ""
    ) {
      return Swal.fire(
        "Datos Relevantes ",
        "Quedan campos vacios o archivos sin seleccionar ",
        "warning"
      );
    } else {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("titulo_vista", values.titulo_vista);
      formData.append("titulo_bienvenida", values.titulo_bienvenida);
      formData.append("texto_bienvenida", values.texto_bienvenida);
      formData.append("texto_informacion", values.texto_informacion);
      formData.append("quienes_somos", values.quienes_somos);
      formData.append("direccion", values.direccion);
      formData.append("footer", values.footer);
      formData.append("img_informacion", values.img_informacion);
      formData.append("img_1_direccion", values.img_1_direccion);
      formData.append("img_2_direccion", values.img_2_direccion);
      formData.append("img_3_direccion", values.img_3_direccion);
      formData.append("urlImg", urlImg);
      formData.append("urlImg1", urlImg1);
      formData.append("urlImg2", urlImg2);
      formData.append("urlImg3", urlImg3);

      dispatch(ActualizarVistaPublica(formData));

      setValues(initialState);
      setSpam("Img Informacion");
      setSpam1("Img Direccion");
      setSpam2("Img Direccion");
      setSpam3("Img Direccion");

      closeModal();
    }
  };

  return (
    <div>
      <button
        className="modal-button"
        onClick={openModal}
        style={{ width: "12vw" }}
      >
        <img
          src={process.env.PUBLIC_URL + "/assets/custom.png"}
          alt="logoImagen"
        />
        <span>Modificar</span>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Nueva Vista Publica"
        className="CustomModal__Content"
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
            padding: "10px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
            animation: "fadeIn 0.3s ease-in-out",
            maxWidth: "80vw",
            width: "100%",
            maxHeight: "90vh",
          },
        }}
      >
        <div className="boxPublic">
          <h2>Formulario Vista Pública</h2>
          <div className="boxPublic-interno">
            <div className="form-column">
              <h2>Datos Relevantes</h2>
              <form className="form-register-public">
                <Modal
                  isOpen={modalEdit}
                  onRequestClose={closeEditModal}
                  contentLabel="Editar Valor"
                  className="CustomModal__Content"
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
                      padding: "10px",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
                      animation: "fadeIn 0.3s ease-in-out",
                      maxWidth: "40vw",
                      width: "100%",
                      maxHeight: "80vh",
                    },
                  }}
                >
                  <h2>Editar Campo</h2>

                  <div className="boxModalInput">
                    <textarea
                      value={editValue}
                      onChange={handleTextareaChange}
                      className="custom-input"
                      name="miAreaTexto"
                      rows="4"
                      cols="50"
                    ></textarea>
                    <div className="char-counter">
                      {textLength[editingField]} / {charLimits[editingField]}
                    </div>
                    <div className="boxModalInputButton">
                      <button
                        className="custom-button"
                        onClick={closeEditModal}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </Modal>
                <div className="inLineInput">
                  <input
                    type="text"
                    autoComplete="off"
                    name="titulo_vista"
                    placeholder="Nombre de la vista"
                    value={values.titulo_vista}
                    onChange={handleChange}
                    onClick={() =>
                      openEditModal("titulo_vista", values.titulo_vista)
                    }
                  />
                  <input
                    type="text"
                    autoComplete="off"
                    name="titulo_bienvenida"
                    placeholder="Titulo de bienvenida"
                    value={values.titulo_bienvenida}
                    onChange={handleChange}
                    onClick={() =>
                      openEditModal(
                        "titulo_bienvenida",
                        values.titulo_bienvenida
                      )
                    }
                  />
                </div>

                <div className="inLineInput">
                  <input
                    type="text"
                    autoComplete="off"
                    name="texto_bienvenida"
                    placeholder="Texto de bienvenida"
                    value={values.texto_bienvenida}
                    onChange={handleChange}
                    onClick={() =>
                      openEditModal("texto_bienvenida", values.texto_bienvenida)
                    }
                  />

                  <div className="imgInput">
                    <div className="inputFalso">
                      <label className="file-input-label">
                        <input
                          type="file"
                          name="img_informacion"
                          onChange={SelectHandle}
                          className="file-input"
                        />
                      </label>
                      <span className="file-name">{spam}</span>
                    </div>
                  </div>
                </div>

                <div className="inLineInput">
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Texto de informacion"
                    name="values.texto_informacion"
                    value={values.texto_informacion}
                    onChange={handleChange}
                    onClick={() =>
                      openEditModal(
                        "texto_informacion",
                        values.texto_informacion
                      )
                    }
                  />
                  <input
                    type="text"
                    autoComplete="off"
                    name="quienes_somos"
                    placeholder="Quienes somos"
                    value={values.quienes_somos}
                    onChange={handleChange}
                    onClick={() =>
                      openEditModal("quienes_somos", values.quienes_somos)
                    }
                  />
                </div>

                <div className="inLineInput">
                  <input
                    type="text"
                    autoComplete="off"
                    name="direccion"
                    placeholder="Direccion"
                    value={values.direccion}
                    onChange={handleChange}
                    onClick={() => openEditModal("direccion", values.direccion)}
                  />
                  <div className="imgInput">
                    <div className="inputFalso">
                      <label className="file-input-label">
                        <input
                          type="file"
                          name="img_1_direccion"
                          onChange={SelectHandleimg1}
                          className="file-input"
                        />
                      </label>
                      <span className="file-name">{spam1}</span>
                    </div>
                  </div>
                </div>

                <div className="inLineInputImagens">
                  <div className="inputFalso">
                    <label className="file-input-label">
                      <input
                        type="file"
                        name="img_3_direccion"
                        onChange={SelectHandleimg3}
                        className="file-input"
                      />
                    </label>
                    <span className="file-name">{spam3}</span>
                  </div>

                  <div className="imgInput">
                    <div className="inputFalso">
                      <label className="file-input-label">
                        <input
                          type="file"
                          name="img_2_direccion"
                          onChange={SelectHandleimg2}
                          className="file-input"
                        />
                      </label>
                      <span className="file-name">{spam2}</span>
                    </div>
                  </div>
                </div>

                <div className="inLineInput">
                  <input
                    type="text"
                    autoComplete="off"
                    name="footer"
                    placeholder="Pie de pagina "
                    value={values.footer}
                    onChange={handleChange}
                    onClick={() => openEditModal("footer", values.footer)}
                  />
                </div>
              </form>
            </div>

            <div className="form-column">
              <h2>Servicios</h2>

              <div className="tableServicesContainer">
                <table className="customTable">
                  <thead>
                    <tr className="header-row">
                      <th>Generales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services
                      .filter(
                        (service) =>
                          service.vista_publica_id === VistaPublicaCharged
                      )
                      ?.map(
                        (service) =>
                          service.categoria === "Generales" && (
                            <tr
                              key={service.id}
                              onClick={() => ServiceClick(service.id)} // Marca el usuario al hacer clic
                              className={
                                service.id === serviceCharged ? "selected" : ""
                              } //Establecer el nonbre de la clase de css para darle afecto de seleccionado
                            >
                              <td>
                                {service.categoria === "Generales"
                                  ? service.tipo
                                  : ""}
                              </td>
                            </tr>
                          )
                      )}
                  </tbody>
                </table>

                <table className="customTable">
                  <thead>
                    <tr className="header-row">
                      <th>Especializados</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services
                      .filter(
                        (service) =>
                          service.vista_publica_id === VistaPublicaCharged
                      )
                      ?.map(
                        (service) =>
                          service.categoria === "Especializados" && (
                            <tr
                              key={service.id}
                              onClick={() => ServiceClick(service.id)} // Marca el usuario al hacer clic
                              className={
                                service.id === serviceCharged ? "selected" : ""
                              } //Establecer el nonbre de la clase de css para darle afecto de seleccionado
                            >
                              <td>
                                {service.categoria === "Especializados"
                                  ? service.tipo
                                  : ""}
                              </td>
                            </tr>
                          )
                      )}
                  </tbody>
                </table>

                <table className="customTable">
                  <thead>
                    <tr className="header-row EP">
                      <th>Emergencia/Prevención</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services
                      .filter(
                        (service) =>
                          service.vista_publica_id === VistaPublicaCharged
                      )
                      ?.map(
                        (service) =>
                          service.categoria ===
                            "Servicios de Emergencia y Prevención" && (
                            <tr
                              key={service.id}
                              onClick={() => ServiceClick(service.id)} // Marca el usuario al hacer clic
                              className={
                                service.id === serviceCharged ? "selected" : ""
                              } //Establecer el nonbre de la clase de css para darle afecto de seleccionado
                            >
                              <td>
                                {service.categoria ===
                                "Servicios de Emergencia y Prevención"
                                  ? service.tipo
                                  : ""}
                              </td>
                            </tr>
                          )
                      )}
                  </tbody>
                </table>
              </div>
              <div className="controlButtons">
                <AgregarServicio />

                <ModificarServicio />

                <button
                  type="button"
                  className="eliminar-servicio"
                  onClick={handleDelete}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/assets/delete.png"}
                    alt="eliminarServicio"
                  />
                </button>
              </div>

              <div className="ButonConfirmRegister">
                <button
                  type="button"
                  className="confirmarFormRegistro"
                  onClick={ConfirmarFormulario}
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
