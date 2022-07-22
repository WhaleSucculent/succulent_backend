import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Nav";
function HeaderFooter() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HeaderFooter;
