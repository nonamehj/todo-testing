import React, { useState } from "react";
import { useGlobalContext } from "../../context";
import "./HomeStyle.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import NotePad from "./NotePad";
import PreviewAgenda from "./PreviewAgenda";
import PreviewList from "./PreviewList";
import useHomeData from "./useHomeData";

const Home = () => {
  const {
    completedListItems,
    pendingListItems,
    completedAgendaItems,
    pendingAgendaItems,
    filterListItems,
    filterAgendaItems,
    todoProgress,
    agendaProgress,
  } = useHomeData();
  const { today, setMenuItems } = useGlobalContext();
  const [textValue, setTextValue] = useState("");
  const [isMemoOpen, setIsMemoOPen] = useState(true);

  const toggleMenu = (name) => {
    setMenuItems((prevMenu) =>
      prevMenu.map((item) =>
        item.name === name
          ? { ...item, activeMenu: true }
          : { ...item, activeMenu: false }
      )
    );
  };
  return (
    <section className="home-section">
      <div className="home-container">
        <div className="home-title">
          <h3>오늘의 목표, 내일의 성과</h3>
        </div>
        <div className="notepad-wrapper">
          <button
            className="notepad-btn"
            onClick={() => setIsMemoOPen(!isMemoOpen)}
          >
            <p>메모장</p>
            {/* <span>{`${isMemoOpen ? "닫기▲" : "열기▼"}`}</span> */}
            <span>
              {isMemoOpen ? (
                <FaAngleUp className="icon" />
              ) : (
                <FaAngleDown className="icon" />
              )}
            </span>
          </button>
          {isMemoOpen && (
            <NotePad setTextValue={setTextValue} textValue={textValue} />
          )}
        </div>
        <div className="preview-wrapper">
          <div className="preview-content">
            <div className="preview-title todo-preview-title">
              <h4>오늘 할일</h4>
              <div className="preview-summary">
                {"("}
                <p>
                  진행 {pendingListItems.length} <span>/</span>
                </p>
                <p>완료 {completedListItems.length}</p> <span>/</span>
                <p>진행률 {`${todoProgress}%`}</p>
                {")"}
              </div>
            </div>
            {filterListItems.length > 0 ? (
              <>
                <PreviewList />
                <button
                  className={`${
                    filterListItems.length > 5
                      ? "preview-more view-more-todo-btn"
                      : "preview-add add-todo-btn"
                  }`}
                  name="오늘할일"
                  onClick={(e) => toggleMenu(e.currentTarget.name)}
                >
                  {filterListItems.length > 5 ? (
                    <p> 많은 일정을 확인하세요</p>
                  ) : (
                    <p>일정을 추가해보세요</p>
                  )}
                </button>
              </>
            ) : (
              <>
                <div className="preview-empty preview-todo-empty">
                  <p>오늘의 일정이 없습니다</p>
                </div>
                <button
                  name="오늘할일"
                  className="preview-add"
                  onClick={(e) => toggleMenu(e.currentTarget.name)}
                >
                  <p>일정을 추가해보세요</p>
                </button>
              </>
            )}
          </div>
          <div className="preview-content">
            <div className="preview-title v agenda-preview-title">
              <div className="preview-title-center">
                <h4>일정 관리</h4>
                <span className="agenda-current-date">{`* ${today.getFullYear()}년 ${
                  today.getMonth() + 1
                }월 ${today.getDate()}일 기준`}</span>
              </div>
              <div className="preview-summary">
                {"("}
                <p>
                  진행 중 {pendingAgendaItems.length} <span>/</span>
                </p>
                <p>완료 {completedAgendaItems.length}</p> <span>/</span>
                <p>진행률 {`${agendaProgress}%`} </p>
                {")"}
              </div>
            </div>
            {filterAgendaItems.length > 0 ? (
              <>
                <PreviewAgenda />
                <button
                  name="일정관리"
                  className={`${
                    filterAgendaItems.length > 5
                      ? "preview-more v view-more-agenda-btn"
                      : "preview-add v add-agenda-btn"
                  }`}
                  onClick={(e) => toggleMenu(e.currentTarget.name)}
                >
                  {filterAgendaItems.length > 5 ? (
                    <p>많은 일정을 확인하세요</p>
                  ) : (
                    <p>일정을 추가해보세요</p>
                  )}
                </button>
              </>
            ) : (
              <>
                <div className="preview-empty preview-agenda-empty">
                  <p>{`${today.getFullYear()}년 ${
                    today.getMonth() + 1
                  }월 ${today.getDate()}일 이후`}</p>
                  <p> 일정이 없습니다</p>
                </div>
                <button
                  name="일정관리"
                  onClick={(e) => toggleMenu(e.currentTarget.name)}
                  className="preview-add"
                >
                  <p>일정을 추가해보세요</p>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
