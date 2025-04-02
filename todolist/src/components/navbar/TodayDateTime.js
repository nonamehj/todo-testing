import React, { useEffect, useState } from "react";

import "./TodayDateTimeStyle.css";
const TodayDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const hours = currentDateTime.getHours();
  const period = hours >= 12 ? "오후" : "오전";
  const displayHour =
    hours === 0
      ? "00"
      : hours > 12
      ? String(hours - 12).padStart(2, "0")
      : String(hours).padStart(2, "0");
  const displayMinute = String(currentDateTime.getMinutes()).padStart(2, "0");
  const displaySecond = String(currentDateTime.getSeconds()).padStart(2, "0");
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="today-date-time-center">
      <p className="today-date-clock">{`${currentDateTime.getFullYear()}. ${
        currentDateTime.getMonth() + 1
      }. ${currentDateTime.getDate()}`}</p>
      <div className="time-center">
        <p className="time-am-pm">{period}</p>
        <p>{`${displayHour} : ${displayMinute} : ${displaySecond}`}</p>
      </div>
    </div>
  );
};

export default TodayDateTime;
