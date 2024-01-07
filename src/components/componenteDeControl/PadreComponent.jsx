import React from "react";
import { RutasGlobales } from "../../routes/RutasGlobales";
import { Provider } from "react-redux"; 
import { store } from "../../store/store";
import "../../styles/componenteDeControl.module.css/control.module.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "animate.css";

export const PadreComponent = () => {
  return (
    <Provider store={store}>
      <RutasGlobales />
    </Provider>
  );
};
