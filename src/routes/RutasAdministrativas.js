// RutasAdministrativas.js
import { Routes, Route } from "react-router-dom";
import { Login } from "../components/dashboard-admin/Login/Login";
import { AdminLayout } from "../components/dashboard-admin/Admin-Layout/AdminLayout";
import { Dashboard } from "../components/dashboard-admin/Admin-Layout/1.dashboard/Dashboard";
import { WorkBench } from "../components/dashboard-admin/Admin-Layout/2.workbench/WorkBench";
import { Administrar } from "../components/dashboard-admin/Admin-Layout/3.administrar/Administrar";
import { Ajustes } from "../components/dashboard-admin/Admin-Layout/4.ajustes/Ajustes";
import { Help } from "../components/dashboard-admin/Admin-Layout/5.ayuda/Help";

import { StartChecking } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { Loading } from "../components/dashboard-admin/LoadingComponent/Loading";
import { PrivateRoute, PublicRoute } from "../helpers/seguridadRutas";

import "../styles/dashboard-admin.modules.css/global.module.css/routes.admin.modules.css";

export const RutasAdministrativas = () => {
  const dispatch = useDispatch();
  const { checking } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(StartChecking());
  }, [dispatch]);

  if (checking) {
    return <Loading />;
  }

  return (
    <div className="background-AdminLayout">
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="workbench" element={<WorkBench />} />
          <Route path="administracion" element={<Administrar />} />
          <Route path="ajustes" element={<Ajustes />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </div>
  );
};
