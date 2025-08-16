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

const getAgendaLocalStorage = () => {
  let agendaItems = localStorage.getItem("agendaItems");
  if (agendaItems) {
    // return (agendaItems = JSON.parse(localStorage.getItem("agendaItems")));
    return JSON.parse(agendaItems).map((agenda) => ({
      ...agenda,
      date: new Date(agenda.date),
    }));
  }
  return [];
};

const AppProvider = ({ children }) => {
  const { showAlert, today, setAlert } = useGlobalContext();
  /*agenda 필수품 */
  const [agendaList, setAgendaList] = useState(getAgendaLocalStorage());
  const [currentDate, setCurrentDate] = useState(new Date()); /*오늘 날짜 */
  const [selectedDate, setSelectedDate] = useState(null); /*선택한 요일 */
  const [isModalOpen, setIsModalOpen] = useState(false); /*모달 오픈 */

  /*form */
  const [items, setItems] = useState(""); /*input 작성 아이템 */
  const [selectedAgendaItems, setSelectedAgendaItems] =
    useState(""); /*선택한 요일 리스트 */
  const [editId, setEditId] = useState(null); /*수정할때 id값*/
  const [isEditing, setIsEditing] = useState(false); /*수정할때 블린값 */
  const editRef = useRef();

  // console.log("agendalist", agendaList);
  // localStorage.clear();

  /*달력 만들기 */
  /* 왜 useMemo로 하면 에러 useCallback으로 체인지*/
  const getFirstDayOfMonth = useCallback((date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }, []);
  const getLastDayOfMonth = useCallback((date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }, []);
  const getDayOfWeek = useCallback((date) => {
    return date.getDay();
  }, []);

  /* 이전 달 */
  const prevMonth = useCallback(() => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  }, []);
  /*다음 달 */
  const nextMonth = useCallback(() => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  }, []);

  const getCalendarDays = useCallback(() => {
    const firstDay = getFirstDayOfMonth(currentDate);
    const lastDay = getLastDayOfMonth(currentDate);
    // const prevLastDay = getLastDayOfMonth(
    //   new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    // );
    const days = [];
    for (let i = 0; i < getDayOfWeek(firstDay); i++) {
      days.push(null);
    }

    /*앞에 빈칸 채울경우 */
    // for (let i = getDayOfWeek(firstDay); i > 0; i--) {
    //   days.push(
    //     new Date(
    //       currentDate.getFullYear(),
    //       currentDate.getMonth() - 1,
    //       prevLastDay.getDate() - i + 1
    //     )
    //   );
    // }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }
    /*뒤에 빈칸에 채울경우 */
    // for (let i = 1; days.length + 1 <= 42; i++) {
    //   days.push(
    //     new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i)
    //   );
    // }
    for (let i = days.length + 1; i <= 42; i++) {
      days.push(null);
    }

    return days;
  }, [currentDate, getDayOfWeek, getFirstDayOfMonth, getLastDayOfMonth]);

  /*agenda 폼 양식 */
  const handleAgendaSubmit = (e) => {
    e.preventDefault();
    if (!items) {
      showAlert(true, "danger", "내용을 입력하세요");
    } else if (items && isEditing) {
      /*수정쪽 편집 해야함 */
      setAgendaList((prev) => {
        return prev.map((agenda) => {
          if (
            agenda.date.toLocaleDateString() ===
            selectedDate.toLocaleDateString()
          ) {
            return {
              ...agenda,
              items: agenda.items.map((item) =>
                item.id === editId ? { ...item, title: items } : item
              ),
            };
          }
          return agenda;
        });
      });
      setItems("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "항목이 수정되었습니다");
    } else {
      showAlert(true, "success", "항목이 추가되었습니다");
      const newItem = {
        id: Date.now(),
        title: items,
        isChecked: false,
        isCompleted: false,
      };
      const selectedDateString = selectedDate.toLocaleDateString();
      setAgendaList((prev) => {
        let updatedAgendaList = prev.map((agenda) => {
          let agendaDateString = agenda.date.toLocaleDateString();
          if (agendaDateString === selectedDateString) {
            return { ...agenda, items: [...agenda.items, newItem] };
          }
          return agenda;
        });
        if (
          !updatedAgendaList.find(
            (agenda) => agenda.date.toLocaleDateString() === selectedDateString
          )
        ) {
          updatedAgendaList = [
            ...updatedAgendaList,
            { date: selectedDate, items: [newItem] },
          ];
        }
        return updatedAgendaList;
      });
      setItems("");
    }
  };
  /*체크시 useCallback 확인해보기 */
  /*리스트 체크시 블린값 */
  const handleCheckBox = useCallback((id) => {
    setSelectedAgendaItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  }, []);
  /*완료 / 삭제 액션 함수*/
  const handleAction = (isChecked, isCompleted, id) => {
    // if (!isCompleted && isChecked) {
    //   selectedRemoveItem(id);
    // } else {
    //   selectedCompleteItem(id);
    // }

    /*후 */

    if (!isCompleted && isChecked) {
      selectedRemoveItem(id);
    } else if (isChecked && isCompleted) {
      selectedRemoveItem(id);
    } else {
      selectedCompleteItem(id);
    }
  };
  /*선택된 리스트 완료 */
  const selectedCompleteItem = useCallback(
    (id) => {
      const updateItems = selectedAgendaItems.map((item) =>
        item.id === id ? { ...item, isChecked: true, isCompleted: true } : item
      );
      setSelectedAgendaItems(updateItems);
      setAgendaList((prev) =>
        prev.map((agenda) => {
          if (
            agenda.date.toLocaleDateString() ===
            selectedDate.toLocaleDateString()
          ) {
            return {
              ...agenda,
              items: agenda.items.map((item) =>
                item.id === id
                  ? { ...item, isChecked: true, isCompleted: true }
                  : item
              ),
            };
          }
          return agenda;
        })
      );
      showAlert(true, "success", "항목을 완료했습니다");
    },
    [selectedAgendaItems, selectedDate, showAlert]
  );
  /*선택된 리스트 삭제 */
  const selectedRemoveItem = useCallback(
    (id) => {
      setAgendaList((prev) =>
        prev
          .map((item) =>
            item.date.toLocaleDateString() === selectedDate.toLocaleDateString()
              ? { ...item, items: item.items.filter((item) => item.id !== id) }
              : item
          )
          .filter((item) => item.items.length > 0 && item)
      );
      showAlert(true, "danger", "항목을 삭제했습니다 ");
    },
    [selectedDate, showAlert]
  );
  /*선택된 리스트 수정 */
  const selectedEditItem = useCallback(
    (id) => {
      const selectedItem = selectedAgendaItems.find((item) => item.id === id);
      setItems(selectedItem.title);
      setIsEditing(true);
      setEditId(id);
      editRef.current.focus();
    },
    [selectedAgendaItems]
  );
  /* 모달 오픈 */
  const calendarModalOpen = useCallback((date) => {
    setIsModalOpen(true);
    setSelectedDate(date);
  }, []);

  /*모달 닫기 */
  const calendarModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setSelectedAgendaItems("");
    setItems("");
    setAlert({ show: false, msg: "", type: "" });
  }, [setAlert]);
  /*선택한 요일 리스트 전체삭제*/
  const selectedListDelete = (date) => {
    setSelectedAgendaItems([]);
    setAgendaList((prev) =>
      prev
        .map((item) =>
          item.date.toLocaleDateString() === date.toLocaleDateString()
            ? { ...item, items: [] }
            : item
        )
        .filter((item) => item.items.length > 0 && item)
    );
    showAlert(true, "danger", "전체 삭제되었습니다.");
  };

  /* 로컬저장*/
  useEffect(() => {
    localStorage.setItem("agendaItems", JSON.stringify(agendaList));
  }, [agendaList]);
  useEffect(() => {
    if (selectedDate) {
      const selectedDateString = selectedDate.toLocaleDateString();
      const agenda = agendaList.find(
        (agenda) => agenda.date.toLocaleDateString() === selectedDateString
      );

      const formItems = agenda ? agenda.items : [];
      setSelectedAgendaItems(formItems);
    }
  }, [selectedDate, agendaList]);

  /*이전 다음 달 클릭시 현재 달에 일치하면 그 요일선택 */
  useEffect(() => {
    if (
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth()
      // &&      currentDate.getDate() === 1
    ) {
      // setCurrentDate(
      //   new Date(today.getFullYear(), today.getMonth(), today.getDate())
      // );
      if (currentDate.getDate() !== today.getDate()) {
        setCurrentDate(
          new Date(today.getFullYear(), today.getMonth(), today.getDate())
        );
      }
    }
  }, [currentDate, today]);
  return (
    <AppContext.Provider
      value={{
        currentDate,
        selectedDate,
        setCurrentDate,
        isModalOpen,
        setIsModalOpen,
        getCalendarDays,
        calendarModalOpen,
        calendarModalClose,
        items,
        setItems,
        editRef,
        isEditing,
        selectedAgendaItems,
        selectedListDelete,
        handleAgendaSubmit,
        handleCheckBox,
        selectedEditItem,
        handleAction,
        agendaList,
        prevMonth,
        nextMonth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAgendaGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
