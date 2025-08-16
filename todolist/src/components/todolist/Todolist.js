import React from "react";
import "./TodoListStyle.css";
import { useGlobalContext } from "../../context";
import { useListGlobalContext } from "../../listContext";
import Alert from "../alert/Alert";
import TodoListItems from "./TodoListItems";
const Todolist = () => {
  const { alert } = useGlobalContext();
  const { list, items, setItems, isEditing, editRef, handleSubmit, clearList } =
    useListGlobalContext();
  return (
    <section className="todo-section">
      <div className="todo-container">
        <div className="todo-title">
          <h3>오늘 할 일</h3>
        </div>
        {alert.show && <Alert />}
        <form action="" className="todo-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              name="items"
              id="items"
              className="todo-input"
              value={items}
              ref={editRef}
              placeholder="오늘의 목표를 입력하세요"
              onChange={(e) => setItems(e.target.value)}
            />
            <button className="submit-btn">
              {isEditing ? "수정" : "추가"}
            </button>
          </div>
        </form>
        {list.length > 0 ? (
          <>
            <TodoListItems />
            <button className="clear-btn" onClick={clearList}>
              전체 삭제
            </button>
          </>
        ) : (
          <div className="todo-empty-message">
            <p>오늘 할 일 일정이 없습니다</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Todolist;
