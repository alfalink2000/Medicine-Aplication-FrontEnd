import React from "react";
import { Menu } from "./menu/Menu";
import { Bienvenida } from "./bienvenida/Bienvenida";
import { Informacion } from "./informacion/Informacion";
import { QuienesSomos } from "./quienesSomos/QuienesSomos";
import { Servicios } from "./servicios/Servicios";
import { Footer } from "./footer/Footer";
import "../../styles/public-Dashboard.modules.css/global.module.css/public.global.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ObtenerVistaPublicaActiva } from "../../actions/vista_publica_activa";
import { GetServicios } from "../../actions/servicios";
import { Centros } from "./centros/Centros";
import { useState } from "react";

export const PublicDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ObtenerVistaPublicaActiva());
    dispatch(GetServicios());
  }, [dispatch]);

  const [infoActiva, setInfoActiva] = useState(false);

  return (
    <div className="background-publico">
      <div className="box-dios">
        <Bienvenida />
        <Informacion />
        <QuienesSomos />
        <Servicios infoActiva={infoActiva} setInfoActiva={setInfoActiva} />
        <Centros setInfoActiva={setInfoActiva} />
        <Footer />
      </div>

      <Menu />
    </div>
  );
};
