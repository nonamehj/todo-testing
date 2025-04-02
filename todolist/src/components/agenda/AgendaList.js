import React from "react";
import { useAgendaGlobalContext } from "../../agendaContext";
import "./AgendaListStyle.css";
const AgendaList = () => {
  const {
    selectedAgendaItems,
    handleCheckBox,
    selectedEditItem,
    handleAction,
  } = useAgendaGlobalContext();
  return (
    <div className="agenda-list-container">
      <div className="agenda-list-center">
        {selectedAgendaItems.map((item) => {
          const { id, title, isChecked, isCompleted } = item;
          return (
            <article
              key={id}
              className={`agenda-item ${isCompleted ? "completed" : ""}`}
            >
              <div className="form-agenda-input">
                <label htmlFor={`checked-${id}`} />
                <input
                  id={`checked-${id}`}
                  type="checkbox"
                  className="input-checkbox"
                  disabled={isCompleted}
                  checked={isChecked || false}
                  onChange={() => handleCheckBox(id)}
                />
                <p className="agenda-content">{title}</p>
              </div>
              <div className="btn-container">
                <button
                  className="edit-btn"
                  disabled={isCompleted}
                  onClick={() => !isCompleted && selectedEditItem(id)}
                >
                  수정
                </button>
                <button
                  // className={isChecked ? "remove-btn" : "complete-btn"}
                  className={
                    isChecked
                      ? "remove-btn"
                      : isCompleted
                      ? "remove-btn"
                      : "complete-btn"
                  }
                  onClick={() => handleAction(isChecked, isCompleted, id)}
                >
                  {/* {isCompleted ? "완료" : isChecked ? "삭제" : "완료"} */}
                  {isCompleted ? "삭제" : isChecked ? "삭제" : "완료"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default AgendaList;
