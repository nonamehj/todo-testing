import React from "react";
import { useListGlobalContext } from "../../listContext";
import "./TodoListItemsStyle.css";
const TodoListItems = () => {
  const { list, editItem, toggleCheckBox, handleAction } =
    useListGlobalContext();
  return (
    <div className="list-container">
      <div className="list-center">
        {list.map((item) => {
          const { id, title, isChecked, isCompleted } = item;
          return (
            <article
              key={id}
              className={`list-item ${isCompleted ? "completed" : ""}`}
            >
              <div className="form-todo-input">
                <label htmlFor={`checked-${id}`} />
                <input
                  id={`checked-${id}`}
                  type="checkbox"
                  checked={isChecked || false}
                  disabled={isCompleted}
                  onChange={() => toggleCheckBox(id)}
                  className="input-checkbox"
                />
                <p className="list-content">{title}</p>
              </div>
              <div className="btn-container">
                <button
                  className="edit-btn"
                  disabled={isCompleted}
                  onClick={() => !isCompleted && editItem(id)}
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

export default TodoListItems;
