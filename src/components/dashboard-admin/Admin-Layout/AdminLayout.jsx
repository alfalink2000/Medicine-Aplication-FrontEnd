import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { startLogout } from "../../../actions/auth";

export const AdminLayout = () => {
  const { pathname } = useLocation();
  const [clase, setClase] = useState("sidebar open");

  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    if (clase === "sidebar open") {
      setClase("sidebar");
    } else if (clase === "sidebar") {
      setClase("sidebar open");
    }
  };

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <>
      <div className={clase}>
        <div className="toggle" onClick={handleClick}>
          <img
            src={process.env.PUBLIC_URL + "/assets/derecha.png"}
            alt="toggle"
          />
        </div>

        <div className="logo">
          <img
            src={process.env.PUBLIC_URL + "/assets/logoNav.png"}
            alt="logoImagen"
          />
          <h3>Medical View</h3>
        </div>

        <hr />

        <nav>
          <div className="nav-title">Administracion</div>

          <ul>
            <Link
              className={`nav-item ${
                pathname === "/admin-dashboard/dashboard" ||
                pathname === "/admin-dashboard"
                  ? "active"
                  : ""
              }`}
              to="/admin-dashboard"
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/dashboard.png"}
                alt="Dashboard"
              />
              <span>Dashboard</span>
            </Link>

            <Link
              className={`nav-item ${
                pathname === "/admin-dashboard/workbench" ? "active" : ""
              }`}
              to="/admin-dashboard/workbench"
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/Info.png"}
                alt="Info"
              />
              <span>Workbench</span>
            </Link>

            <Link
              className={`nav-item ${
                pathname === "/admin-dashboard/administracion" ? "active" : ""
              }`}
              to="/admin-dashboard/administracion"
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/admin.png"}
                alt="administrar"
              />
              <span>Administrar</span>
            </Link>

            <Link
              className={`nav-item ${
                pathname === "/admin-dashboard/ajustes" ? "active" : ""
              }`}
              to="/admin-dashboard/ajustes"
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/configuracion.png"}
                alt="ajuste"
              />
              <span>Ajustes</span>
            </Link>

            <Link
              className={`nav-item ${
                pathname === "/admin-dashboard/help" ? "active" : ""
              }`}
              to="/admin-dashboard/help"
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/help.png"}
                alt="ayuda"
              />
              <span>Ayuda</span>
            </Link>

            <Link
              className={`nav-item ${pathname === "/" ? "active" : ""}`}
              onClick={handleLogout}
            >
              <img
                src={process.env.PUBLIC_URL + "/assets/logout.png"}
                alt="salir"
              />
              <span>Salir</span>
            </Link>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};
