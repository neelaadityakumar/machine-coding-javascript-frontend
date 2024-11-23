// src/Calendar.js
import React, { useState } from "react";
import "./index.css";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ year, month }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const onDateClick = (day) => {
    setSelectedDate(new Date(year, month, day));
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateClass =
        selectedDate && selectedDate.getDate() === day
          ? "calendar-day selected"
          : "calendar-day";
      days.push(
        <div key={day} className={dateClass} onClick={() => onDateClick(day)}>
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        {year} - {month + 1}
      </div>
      <div className="calendar-days">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="calendar-day-header">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
