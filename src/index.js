import React from "react";
import ReactDOM from "react-dom/client";
import { PadreComponent } from "./components/componenteDeControl/PadreComponent";

import { initReactI18next } from "react-i18next";
import i18next from "i18next";

import es from "./locales/es/global.json";
import en from "./locales/en/global.json";

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  resources: {
    es: {
      translation: es,
    },
    en: {
      translation: en,
    },
  },
});
i18next.changeLanguage("en");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PadreComponent />);
