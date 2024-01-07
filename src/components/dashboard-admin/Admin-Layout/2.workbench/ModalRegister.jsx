import React, { useState } from "react";
import Modal from "react-modal";
import { InsertarExtranjero } from "../../../../actions/extranjeros";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

export const ModalRegister = () => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const initialState = {
    nombre: "",
    edad: "",
    pais_residencia: "",
    nacionalidad: "",
    genero: "",
    direccion_particular: "",
    fecha_nacimiento: "",
    telefono: "",
    correo_electronico: "",
    local_atendido: "",
    solicitud_ingreso: "",
  };

  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(values.correo_electronico)) {
      // Mostrar una alerta con SweetAlert
      Swal.fire({
        icon: "error",
        title: "Correo electrónico incorrecto",
        text: "Por favor, ingrese un correo electrónico válido.",
      });
      return;
    }

    if (
      values.nombre === "" ||
      values.edad === "" ||
      values.pais_residencia === "" ||
      values.nacionalidad === "" ||
      values.genero === "" ||
      values.direccion_particular === "" ||
      values.fecha_nacimiento === "" ||
      values.telefono === "" ||
      values.correo_electronico === "" ||
      values.local_atendido === "" ||
      values.solicitud_ingreso === ""
    ) {
      return Swal.fire(
        "Datos Relevantes ",
        "Quedan campos vacios o archivos sin seleccionar ",
        "warning"
      );
    } else {
      dispatch(InsertarExtranjero(values));

      setValues(initialState);
      closeModal();
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
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

  const paisesUnicos = [
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Ecuador",
    "El Salvador",
    "España",
    "USA",
    "Guatemala",
    "Honduras",
    "México",
    "Nicaragua",
    "Panamá",
    "Paraguay",
    "Perú",
    "Puerto Rico",
    "República Dominicana",
    "Uruguay",
    "Venezuela",
    "India",
    "China",
    "Canadá",
    "Reino Unido",
    "Australia",
    "Alemania",
    "Francia",
    "Italia",
    "Japón",
    "Sudáfrica",
    "Rusia",
    "Corea del Sur",
    "Singapur",
    "Emiratos Árabes Unidos",
    "Arabia Saudita",
    "Otro",
  ];

  return (
    <div>
      <button onClick={openModal}>
        <img
          src={process.env.PUBLIC_URL + "/assets/insert-user.png"}
          alt="Insertar"
        />
        <label>Insertar</label>
      </button>

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
            overflow: "hidden",
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
          Registro de Extranjero
        </h2>
        <form className="form-register">
          <input
            type="text"
            autoComplete="off"
            name="nombre"
            placeholder="Nombre"
            value={values.nombre}
            onChange={handleChange}
          />
          {/* Resto de los campos */}
          <input
            type="number"
            autoComplete="off"
            name="edad"
            placeholder="Edad"
            value={values.edad}
            onChange={handleChange}
          />
          <select
            name="pais_residencia"
            value={values.pais_residencia}
            onChange={handleChange}
          >
            <option value="" disabled>
              País de residencia
            </option>
            {paisesUnicos.map((pais) => (
              <option key={pais} value={pais}>
                {pais}
              </option>
            ))}
          </select>

          <select
            name="nacionalidad"
            value={values.nacionalidad}
            onChange={handleChange}
          >
            <option value="" disabled>
              Nacionalidad
            </option>
            {paisesUnicos.map((pais) => (
              <option key={pais} value={pais}>
                {pais}
              </option>
            ))}
          </select>
          <select name="genero" value={values.genero} onChange={handleChange}>
            <option value="" disabled>
              Seleccione
            </option>
            <option value={"Hombre"}>Hombre</option>
            <option value={"Mujer"}>Mujer</option>
            <option value={"Trans"}>Trans</option>
            <option value={"Otro"}>Otro</option>
          </select>
          <input
            type="text"
            autoComplete="off"
            name="direccion_particular"
            placeholder="direccion_particular"
            value={values.direccion_particular}
            onChange={handleChange}
          />
          <input
            type="date"
            autoComplete="off"
            name="fecha_nacimiento"
            placeholder="fecha_nacimiento"
            value={values.fecha_nacimiento}
            onChange={handleChange}
          />
          <input
            type="number"
            autoComplete="off"
            name="telefono"
            placeholder="telefono"
            value={values.telefono}
            onChange={handleChange}
          />
          <input
            type="email"
            autoComplete="off"
            name="correo_electronico"
            placeholder="correo_electronico"
            value={values.correo_electronico}
            onChange={handleChange}
          />

          <input
            type="text"
            autoComplete="off"
            name="local_atendido"
            placeholder="Local atendido"
            value={values.local_atendido}
            onChange={handleChange}
          />

          <select
            name="solicitud_ingreso"
            value={values.solicitud_ingreso}
            onChange={handleChange}
          >
            <option value="" disabled>
              Ingreso
            </option>
            <option value="no">No</option>
            <option value="si">Si</option>
          </select>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <button type="button" onClick={handleSubmit} className="confirmar">
              Confirmar
            </button>
            <button type="button" onClick={closeModal} className="cancelar">
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
