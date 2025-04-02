import { createContext, useCallback, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [today] = useState(new Date());
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "메인화면", activeMenu: true },
    { id: 2, name: "오늘할일", activeMenu: false },
    { id: 3, name: "일정관리", activeMenu: false },
  ]);

  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const showAlert = useCallback((show = false, type = "", msg = "") => {
    setAlert({ show, msg, type });
  }, []);

  return (
    <AppContext.Provider
      value={{
        today,
        menuItems,
        setMenuItems,
        alert,
        setAlert,
        showAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
