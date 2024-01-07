import React from "react";
import { Routes, Route } from "react-router-dom";
import { PublicDashboard } from "../components/public-Dashboard/PublicDashboard";

export const RutaPublica = () => {
  return (
    <>
      <Routes>
        <Route index element={<PublicDashboard />} />
      </Routes>
    </>
  );
};
