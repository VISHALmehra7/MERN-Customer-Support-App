import React from "react";
import { authStore } from "../store/authStore.js";
import LeftPage from "../pages/SubPages.jsx/LeftPage.jsx";
import MiddlePage from "../pages/SubPages.jsx/MiddlePage.jsx";
import RightPage from "../pages/SubPages.jsx/RightPage.jsx";

const Dashboard = () => {
  const role = authStore((state) => state.role);
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 ">
      <LeftPage />
      <MiddlePage />
      <RightPage />
    </div>
  );
};

export default Dashboard;
