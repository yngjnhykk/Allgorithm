import React from "react";
import { Routes, Route } from "react-router";
import ListPage from "./pages/ListPage/ListPage";
import Register from "./pages/ListPage/Register";
import Simulator from "./pages/MainPage/Simulator";
import Dashboard from "./pages/Dashboard";
import MainPage from "./pages/MainPage/MainPage";
import NewAlgorithm from "./pages/NewAlgorithm/NewAlgorithm";
import AlgorithmTest from "./pages/AlgorithmTest/AlgorithmTest.jsx";

function Router() {
  return (
    <div className={"mx-auto"} style={{ maxWidth: 1728 }}>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/simulator" element={<Simulator />}></Route>
        <Route path="/dashboard/:id" element={<Dashboard />}></Route>
        <Route path="/newAlgorithm" element={<NewAlgorithm />}></Route>
        <Route path="/algorithmTest" element={<AlgorithmTest />}></Route>
      </Routes>
    </div>
  );
}

export default Router;
