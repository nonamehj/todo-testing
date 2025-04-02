import "./index.css";
import Home from "./components/home/Home";
import Agenda from "./components/agenda/Agenda";
import Todolist from "./components/todolist/Todolist";
import Navbar from "./components/navbar/Navbar";
import { useEffect } from "react";
import { useGlobalContext } from "./context";

function App() {
  const { menuItems } = useGlobalContext();

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    const setMainContainerHeight = () => {
      const mainElement = document.querySelector("main");
      if (mainElement) {
        mainElement.style.height = `calc(var(--vh) * 100)`;
      }
    };

    const handleResize = () => {
      setViewportHeight();
      setMainContainerHeight();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <main>
      <div className="main-container">
        <div className="main-wrapper">
          <Navbar />
          {menuItems[0].activeMenu && <Home />}
          {menuItems[1].activeMenu && <Todolist />}
          {menuItems[2].activeMenu && <Agenda />}
        </div>
      </div>
    </main>
  );
}

export default App;
