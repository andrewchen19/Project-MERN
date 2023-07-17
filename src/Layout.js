import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "./components/Footer";
import Nav from "./components/Nav";

const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <div>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;
