import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import logo from "@/assets/Toodoo.svg";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
