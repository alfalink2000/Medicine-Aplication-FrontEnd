import React, { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { StartLogin } from "../../../actions/auth";
import Swal from "sweetalert2";

export const Login = () => {
  const dispatch = useDispatch();

  const [formLoginValue, handleInputChange] = useForm({
    name_user: "",
    password_user: "",
  });

  const { name_user, password_user } = formLoginValue;

  const [isUsernameFocused, setUsernameFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name_user === "" || password_user === "") {
      return Swal.fire("Datos Relevantes ", "Quedan campos vacios ", "warning");
    } else {
      dispatch(StartLogin(name_user, password_user));
    }
  };

  const handleUsernameFocus = () => {
    setUsernameFocused(true);
  };

  const handleUsernameBlur = () => {
    setUsernameFocused(false);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  return (
    <>
      <div className="container-fluid fondo-login">
        <section>
          <div className="login-box-mayor">
            <div className="login-box-menor">
              <div className="logotipo-imagen">
                <img
                  src={process.env.PUBLIC_URL + "/assets/usuario.png"}
                  alt="logoImagen"
                />
                <h2>Portal de Acceso</h2>
              </div>
              <hr />

              <div className="box-formLogin">
                <div className="box-inputs-form">
                  <form onSubmit={handleSubmit}>
                    <ul>
                      <li>
                        <span>
                          <img
                            src={process.env.PUBLIC_URL + "/assets/user.png"}
                            alt="user"
                          />
                        </span>
                        <label
                          className={isUsernameFocused ? "focused" : ""}
                          htmlFor="name_user"
                        >
                          Usuario:
                        </label>
                        <input
                          type="text"
                          placeholder="Inserte su nombre de usuario"
                          autoComplete="off"
                          name="name_user"
                          id="name_user"
                          onFocus={handleUsernameFocus}
                          onBlur={handleUsernameBlur}
                          onChange={handleInputChange}
                          value={name_user}
                        />
                      </li>
                      <li>
                        <span>
                          <img
                            src={
                              process.env.PUBLIC_URL + "/assets/password.png"
                            }
                            alt="password"
                          />
                        </span>
                        <label
                          className={isPasswordFocused ? "focused" : ""}
                          htmlFor="password_user"
                        >
                          Contraseña:
                        </label>
                        <input
                          type="password"
                          placeholder="Inserte la contraseña"
                          autoComplete="off"
                          name="password_user"
                          id="password_user"
                          onFocus={handlePasswordFocus}
                          onBlur={handlePasswordBlur}
                          onChange={handleInputChange}
                          value={password_user}
                        />
                      </li>
                    </ul>
                    <div className="box-button-submit">
                      <button className="submit-button" type="submit">
                        Acceder
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
