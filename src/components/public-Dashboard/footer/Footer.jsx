import React from "react";
import { useSelector } from "react-redux";

export const Footer = () => {
  const activeVist = useSelector(
    (state) => state.getActiveVist.vistaPublicaObtenida
  );
  return (
    <div className="footer">
      <img
        src={process.env.PUBLIC_URL + "/assets/footer.svg"}
        alt="footer"
        className="footer-img"
      />
      <div className="footer-text">
        {activeVist.footer ||
          "Health X Health - Tu socio en la búsqueda de un estilo de vida saludable. Descubre nuestras instalaciones, servicios y el compromiso con tu bienestar. ¡Contáctanos para comenzar tu viaje hacia la salud integral!"}
      </div>
    </div>
  );
};
