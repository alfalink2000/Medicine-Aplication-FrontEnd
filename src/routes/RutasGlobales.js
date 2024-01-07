import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RutaPublica } from "./RutaPublica";
import { RutasAdministrativas } from "./RutasAdministrativas";

import "../styles/responsives.modules.css/responsives.css";

export const RutasGlobales = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<RutaPublica />} />
        <Route path="/*" element={<RutasAdministrativas />} />
      </Routes>
    </BrowserRouter>
  );
};
