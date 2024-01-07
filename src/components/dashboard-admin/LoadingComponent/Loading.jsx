import React from "react";
import { PulseLoader } from "react-spinners";
import "../../../styles/loading.module.css/Loading.css";

export const Loading = () => {
  return (
    <div className="background-AdminLayout loading-container">
      <PulseLoader size={18} color="#4ece04" loading={true} />
    </div>
  );
};
