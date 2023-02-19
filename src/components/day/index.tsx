import { AppContext, Event } from "context/app.context";
import dayjs, { Dayjs } from "dayjs";
import React, { FC, useContext, useEffect, useState } from "react";

interface DayProps {
  day: Dayjs;
  rowIndex: number;
}

const Day: FC<DayProps> = ({ day, rowIndex }) => {
  const [dayEvents, setDayEvents] = useState<Event[]>([]);
  const { setDaySelected, setShowEventModal, savedEvents } =
    useContext(AppContext);

  useEffect(() => {
    const events = savedEvents.filter((event: Event) => {
      return dayjs(event.day).isSame(day, "day");
    });
    setDayEvents(events);
  }, [savedEvents, day]);

  const getCurrentDayClass = () => {
    if (day.isSame(new Date(), "day")) {
      return "bg-blue-600 text-white rounded-full w-7";
    }
    return "";
  };

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIndex === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toLocaleUpperCase()}
          </p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((event, index) => (
          <div
            key={index}
            className={`bg-${event.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate text-center`}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
