import React from "react";
import "./AgendaFormStyle.css";
import { useAgendaGlobalContext } from "./../../agendaContext";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../../context";
import Alert from "./../alert/Alert";
import AgendaList from "./AgendaList";
const AgendaForm = () => {
  const { alert } = useGlobalContext();
  const {
    selectedAgendaItems,
    selectedDate,
    calendarModalClose,
    items,
    setItems,
    editRef,
    isEditing,
    selectedListDelete,
    handleAgendaSubmit,
  } = useAgendaGlobalContext();
  // const selectedDateTitle = `${selectedDate.getFullYear()}년 ${
  //   selectedDate.getMonth() + 1
  // }월 ${selectedDate.getDate()}일`;
  const selectedDateTitle = `${
    selectedDate.getMonth() + 1
  }월 ${selectedDate.getDate()}일`;

  return (
    <div className="agenda-form-container">
      <div className="agenda-form-center">
        <div className="agenda-form-title">
          <h3>{`${selectedDateTitle} 일정관리 `}</h3>
          <button onClick={calendarModalClose} className="agenda-modal-close">
            <FaTimes />
          </button>
        </div>
        {alert.show && <Alert />}
        <form action="" className="agenda-form" onSubmit={handleAgendaSubmit}>
          <div className="form-center">
            <input
              type="text"
              name="agenda-items"
              id="agenda-items"
              value={items}
              className="agenda-input"
              ref={editRef}
              placeholder={` ${
                selectedDate.getMonth() + 1
              }월 ${selectedDate.getDate()}일 일정을 입력하세요`}
              onChange={(e) => setItems(e.target.value)}
            />
            <button className="submit-btn">
              {isEditing ? "수정" : "추가"}
            </button>
          </div>
        </form>
        {selectedAgendaItems.length > 0 ? (
          <>
            <AgendaList />
            <button
              className="delete-all-btn"
              onClick={() => selectedListDelete(selectedDate)}
            >
              전체 삭제
            </button>
          </>
        ) : (
          <div className="agenda-empty-message">
            <p>{selectedDateTitle}</p>
            <p>선택한 날짜에 일정이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgendaForm;
