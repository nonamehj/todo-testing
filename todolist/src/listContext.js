import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGlobalContext } from "./context";

const AppContext = createContext();

const getListLocalStorage = () => {
  let todoItems = localStorage.getItem("todoItems");
  // if (todoItems) {
  //   todoItems = JSON.parse(localStorage.getItem("todoItems"));
  // }
  // return [];
  return todoItems ? JSON.parse(todoItems) : [];
};

const AppProvider = ({ children }) => {
  const { showAlert } = useGlobalContext();
  const [list, setList] = useState(getListLocalStorage());
  const [items, setItems] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const editRef = useRef();

  /*폼 양식 */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!items) {
      showAlert(true, "danger", "내용을 입력하세요");
    } else if (items && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: items };
          }
          return item;
        })
      );
      setItems("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "수정되었습니다");
    } else {
      const newItem = {
        id: Date.now(),
        title: items,
        isChecked: false,
        isCompleted: false,
      };
      // setList([...list, newItem]);
      setList((prev) => [...prev, newItem]);
      showAlert(true, "success", "항목이 추가되었습니다");
      setItems("");
    }
  };
  /*폼 체크박스 */
  const toggleCheckBox = (id) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };
  /*폼 액션(삭제 와 완료) */
  const handleAction = (isChecked, isCompleted, id) => {
    if (!isCompleted && isChecked) {
      removeItem(id);
    } else if (isChecked && isCompleted) {
      removeItem(id);
    } else {
      completeItem(id);
    }
  };
  /* 폼 완료*/
  const completeItem = (id) => {
    const tempItem = list.map((item) =>
      item.id === id ? { ...item, isChecked: true, isCompleted: true } : item
    );
    setList(tempItem);
    showAlert(true, "success", "항목을 완료했습니다");
  };
  /* 폼 삭제 */
  const removeItem = (id) => {
    const tempItem = list.filter((item) => item.id !== id);
    setList(tempItem);
    showAlert(true, "danger", "항목을 삭제했습니다");
  };

  /*폼 수정 */
  const editItem = (id) => {
    const tempItem = list.find((item) => item.id === id);
    setItems(tempItem.title);
    setEditId(id);
    setIsEditing(true);
    editRef.current.focus();
  };

  /* */

  /*폼 전체 삭제*/
  const clearList = useCallback(() => {
    setList([]);
    showAlert(true, "danger", "모든 항목을 삭제했습니다");
  }, [showAlert]);
  /*localstorage useEffect */
  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(list));
  }, [list]);
  return (
    <AppContext.Provider
      value={{
        list,
        items,
        setItems,
        isEditing,
        editRef,
        handleSubmit,
        editItem,
        clearList,
        toggleCheckBox,
        handleAction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useListGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
