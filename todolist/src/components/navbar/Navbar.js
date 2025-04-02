import React from "react";
import "./NavbarStyle.css";
import TodayDateTime from "./TodayDateTime";
import MenuBtns from "./MenuBtns";
const Navbar = () => {
  return (
    <nav>
      <div className="nav-container">
        <TodayDateTime />
        <MenuBtns />
      </div>
    </nav>
  );
};

export default Navbar;
