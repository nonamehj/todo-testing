import React, { useCallback } from "react";
import { useAgendaGlobalContext } from "../../agendaContext";
import { useGlobalContext } from "../../context";
import "./MenuBtnsStyle.css";
import { useListGlobalContext } from "./../../listContext";
const MenuBtns = () => {
  const { menuItems, setMenuItems, setAlert } = useGlobalContext();
  const { setIsModalOpen, setItems: setAgendaItems } = useAgendaGlobalContext();
  const { setItems: setTodoItems } = useListGlobalContext();
  const toggleMenu = useCallback(
    (name) => {
      setMenuItems((prevMenu) =>
        prevMenu.map((item) =>
          item.name === name
            ? { ...item, activeMenu: true }
            : { ...item, activeMenu: false }
        )
      );
      const isAlreadyActive = menuItems.some(
        (item) => item.name === name && item.activeMenu
      );
      if (!isAlreadyActive) {
        setIsModalOpen(false);
        setAgendaItems("");
        setTodoItems("");
        setAlert({ show: false, msg: "", type: "" });
      }
    },
    [
      setMenuItems,
      menuItems,
      setIsModalOpen,
      setAgendaItems,
      setAlert,
      setTodoItems,
    ]
  );
  return (
    <div className="menu-buttons-center">
      <ul className="menu-list">
        {menuItems.map((item) => {
          return (
            <li key={item.id}>
              <button
                className={`menu-btn ${
                  item.activeMenu ? "active-menu-btn" : ""
                }`}
                name={item.name}
                onClick={(e) => toggleMenu(e.target.name)}
              >
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuBtns;
