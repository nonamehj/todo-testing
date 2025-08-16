import React, { useEffect } from "react";
import "./AgendaStyle.css";
import { useAgendaGlobalContext } from "../../agendaContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CalendarDays from "./CalendarDays";
import AgendaForm from "./AgendaForm";
const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
const Agenda = () => {
  const { currentDate, setCurrentDate, isModalOpen, prevMonth, nextMonth } =
    useAgendaGlobalContext();

  useEffect(() => {
    setCurrentDate(new Date());
  }, [setCurrentDate]);
  return (
    <section className="agenda-section">
      <div className="agenda-container">
        <div className="agenda-header">
          <button className="prev-month-btn" onClick={prevMonth}>
            <FaArrowLeft />
          </button>

          <h3>{`${currentDate.getFullYear()}년 ${
            currentDate.getMonth() + 1
          }월 일정관리`}</h3>

          <button className="next-month-btn" onClick={nextMonth}>
            <FaArrowRight />
          </button>
        </div>
        <div className="agenda-calendar">
          <div className="agenda-status">
            <p>오늘</p> <span className="highlight-today"></span>
            <p>진행</p> <span className="highlight-in-progress"></span>
            <p>마감</p> <span className="highlight-deadline"></span>
            <p>지연</p> <span className="highlight-in-overdue"></span>
            <p>완료</p> <span className="highlight-completed"></span>
          </div>
          <div className="calendar-container">
            <div className="calendar-weekdays">
              {daysOfWeek.map((week) => {
                return (
                  <div key={week} className="calendar-week">
                    <p>{week}</p>
                  </div>
                );
              })}
            </div>
            <CalendarDays />
            {isModalOpen && <AgendaForm />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Agenda;
