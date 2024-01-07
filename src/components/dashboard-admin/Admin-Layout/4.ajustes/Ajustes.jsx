import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { UpdateUser } from "../../../../actions/auth";
import Swal from "sweetalert2";

export const Ajustes = () => {
  const dispatch = useDispatch();

  const [formUpdateValue, handleInputChange, reset] = useForm({
    userId: "1",
    name_user: "",
    email: "",
    password_user: "",
    new_password: "",
    new_password1: "",
  });

  const {
    userId,
    name_user,
    email,
    password_user,
    new_password,
    new_password1,
  } = formUpdateValue;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new_password !== new_password1) {
      return Swal.fire("Error", "Las contraseñas no coinciden", "error");
    }

    if (
      name_user === "" ||
      password_user === "" ||
      email === "" ||
      new_password === "" ||
      new_password1 === ""
    ) {
      return Swal.fire("Datos Relevantes ", "Quedan campos vacios ", "warning");
    } else {
      dispatch(
        UpdateUser(userId, name_user, email, password_user, new_password)
      );
      reset();
    }
  };

  return (
    <div className="container-fluid container-ajuste">
      <div className="row">
        <div
          className="col-12 box-ajustes ajuste 
                        offset-lg-2 offset-md-2 offset-sm-0 "
        >
          <div className="panelArriba-ajuste">
            <div className="EncabezadoAjuste row">
              <h2 className="mb-4 text-ajuste col-9">
                Configuracion de Cuenta
              </h2>
              <img
                className="col-3"
                src={process.env.PUBLIC_URL + "/assets/ajusteIcon.png"}
                alt="iconUser"
              />
            </div>

            <hr />
            <form onSubmit={handleSubmit}>
              <ul>
                <li>
                  <div>
                    <label htmlFor="name_user">Nombre Usuario:</label>
                  </div>
                  <div>
                    <input
                      type="hidden"
                      name="id" // Asegúrate de que el name sea "id"
                      value={userId} // Asegúrate de que userId contenga el valor correcto del id del usuario
                    />
                    <input
                      type="text"
                      placeholder="Ingrese su Nombre de usuario"
                      autoComplete="off"
                      name="name_user"
                      id="name_user"
                      onChange={handleInputChange}
                      value={name_user}
                    />
                  </div>
                </li>

                <li>
                  <div>
                    <label htmlFor="email">Correo Electronico:</label>
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Ingrese su Correo electronico"
                      autoComplete="off"
                      name="email"
                      id="email"
                      onChange={handleInputChange}
                      value={email}
                    />
                  </div>
                </li>

                <li>
                  <div>
                    <label htmlFor="password_user">Contraseña Actual:</label>
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Ingrese su contraseña actual"
                      autoComplete="off"
                      name="password_user"
                      id="password_user"
                      onChange={handleInputChange}
                      value={password_user}
                    />
                  </div>
                </li>

                <li>
                  <div>
                    <label htmlFor="new_password">Contraseña Nueva:</label>
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Ingrese la nueva contraseña"
                      autoComplete="off"
                      name="new_password"
                      id="new_password"
                      onChange={handleInputChange}
                      value={new_password}
                    />
                  </div>
                </li>

                <li>
                  <div>
                    <label htmlFor="new_password1">Repetir Contraseña:</label>
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Ingrese de nuevo la contaseña"
                      autoComplete="off"
                      name="new_password1"
                      id="new_password1"
                      onChange={handleInputChange}
                      value={new_password1}
                    />
                  </div>
                </li>
              </ul>

              <div className="butonDiv">
                <button type="submit">Guardar Cambios</button>
              </div>
            </form>
          </div>

          <div className="ajuste-administrativo">
            <Link to="/admin-dashboard/help">
              <button>
                <img
                  src={process.env.PUBLIC_URL + "/assets/help.png"}
                  alt="logoImagen"
                />
                <span>Ayuda Ajustes</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
