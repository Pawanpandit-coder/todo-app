import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-4 p-4">
      <Navbar />

      <section className="flex justify-center items-center p-2">
        <Outlet />
      </section>

      <Footer />
    </div>
  );
}

export default Layout;
