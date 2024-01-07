import { fetchConToken, fetchSinToken } from "../helpers/fetchAdmin";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const StartLogin = (name_user, password_user) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "usuario",
      { name_user, password_user },
      "POST"
    );
    const body = await resp.json();

    if (body.ok) {
      Swal.fire({
        icon: "success",
        title: "Éxito!",
        text: "Operación realizada con éxito.",
        showConfirmButton: false, // Evita que el usuario cierre manualmente el SweetAlert
        timer: 1500,
      });

      // Esperar 1 segundo y medio antes de redirigir al dashboard
      await new Promise((resolve) => setTimeout(resolve, 1500));

      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login({ uid: body.id, name: body.usuario }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const UpdateUser = (
  id,
  name_user,
  email,
  password_user,
  new_password
) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "usuario/update",
      { id, name_user, email, password_user, new_password },
      "PUT"
    );
    const body = await resp.json();

    if (body.ok) {
      Swal.fire({
        icon: "success",
        title: "Éxito!",
        text: "Operación realizada con éxito.",
        showConfirmButton: false, // Evita que el usuario cierre manualmente el SweetAlert
        timer: 1500,
      });
      dispatch(login({ uid: body.id, name: body.usuario }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const StartChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("usuario/renew");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name }));

      console.log("StartChekink ok:", body.ok);
    } else {
      dispatch(checkingFinish());
      console.log("No existe el token");
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
