import { AppContext } from "context/app.context";
import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "utils";

const SmallCalendar = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(
    dayjs().month()
  );
  const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>();

  const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected } =
    useContext(AppContext);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => prev + 1);
  };

  const getDayClass = (day: Dayjs) => {
    const slcDay = daySelected && daySelected.format("YYYY-MM-DD");
    if (day.isSame(dayjs(), "day")) {
      return "bg-blue-500 text-white rounded-full";
    } else if (day.isSame(slcDay, "day")) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  };
  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
            "MMMM YYYY"
          )}
        </p>
        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_left
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_right
          </span>
        </button>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth &&
          currentMonth[0].map((day, i) => (
            <div key={i} className="text-sm py-1 text-center">
              {day.format("dd").charAt(0)}
            </div>
          ))}
        {currentMonth &&
          currentMonth.map((week, i) => (
            <React.Fragment key={i}>
              {week.map((day, j) => (
                <button
                  key={j}
                  className={`py-1 w-full transition-all ${getDayClass(day)}`}
                  onClick={() => {
                    setSmallCalendarMonth(currentMonthIndex);
                    setDaySelected(day);
                  }}
                >
                  <span className="text-sm">{day.format("D")}</span>
                </button>
              ))}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
