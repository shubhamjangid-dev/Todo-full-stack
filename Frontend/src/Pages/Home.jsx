import React from "react";
import Menu from "@/PageComponents/Menu";
import { Outlet } from "react-router-dom";
function Home() {
  return (
    <div className="w-full min-h-screen flex ">
      <div className="min-h-screen w-64 bg-slate-300">
        <Menu className="w-full" />
      </div>
      <div className="min-h-screen bg-white flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
