import React, { useMemo } from "react";
import "./CalendarDaysStyle.css";
import { useAgendaGlobalContext } from "./../../agendaContext";
import { useGlobalContext } from "../../context";
const CalendarDays = () => {
  const { currentDate, getCalendarDays, calendarModalOpen, agendaList } =
    useAgendaGlobalContext();
  const { today } = useGlobalContext();
  /*클래스 함수 일단 괜춘  전체적인거 다 확인후 삭제 */
  /*리스트에 작성된거 표시 */
  let getAgendaCheckList = useMemo(() => {
    return agendaList.reduce((prev, item) => {
      if (item.items.length > 0) prev[item.date.toLocaleDateString()] = item;
      return prev;
    }, {});
  }, [agendaList]);

  return (
    <div className="calendar-days-container">
      {getCalendarDays().map((day, index) => {
        const dayString = day?.toLocaleDateString();
        const isAllCompleted = day !== null && getAgendaCheckList[dayString];
        const isCompleted = isAllCompleted
          ? isAllCompleted.items.every((item) => item.isCompleted)
          : false;
        const isOverdue =
          day?.toLocaleDateString() < today.toLocaleDateString();

        return (
          <button
            key={`${day}-${index}`}
            className={`calendar-day calendar-day-btn ${
              day?.getMonth() === currentDate.getMonth() &&
              day?.getDate() === currentDate.getDate()
                ? "activeDay"
                : ""
            } ${
              isCompleted
                ? "completedDay"
                : isAllCompleted
                ? "incompleteDay"
                : ""
            }  ${isOverdue ? "OverdueDay" : ""}`}
            disabled={!day}
            onClick={() => calendarModalOpen(day)}
          >
            <p>
              {day
                ? day.getMonth() === currentDate.getMonth()
                  ? day.getDate()
                  : day.getDate()
                : ""}
            </p>
            {isAllCompleted && <p className="agenda-day-underline"></p>}
          </button>
        );
      })}
    </div>
  );
};

export default CalendarDays;
