import dayjs from "dayjs";
import React, { useEffect, useReducer, useState } from "react";

export type Event = {
  id: string;
  title: string;
  day: dayjs.Dayjs;
  description?: string;
  label: string;
};

type AppContextType = {
  monthIndex: number;
  setMonthIndex: (monthIndex: number) => void;
  smallCalendarMonth: number;
  setSmallCalendarMonth: (monthIndex: number) => void;
  daySelected: dayjs.Dayjs;
  setDaySelected: (day: dayjs.Dayjs) => void;
  showEventModal: boolean;
  setShowEventModal: (show: boolean) => void;
  dispatchCalEvent: React.Dispatch<{ type: string; payload: any }>;
  savedEvents: Array<Event>;
};

function savedEventsReducer(
  state: Array<Event>,
  { type, payload }: { type: string; payload: Event }
) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((event) => (event.id === payload.id ? payload : event));
    case "delete":
      return state.filter((event) => event.id !== payload.id);
    default:
      return state;
  }
}

function initsEvents() {
  const savedEvents = localStorage.getItem("events");
  return savedEvents ? JSON.parse(savedEvents) : [];
}

export const AppContext = React.createContext<AppContextType>({
  monthIndex: 0,
  setMonthIndex: (monthIndex: number) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (monthIndex: number) => {},
  daySelected: dayjs(),
  setDaySelected: (day: dayjs.Dayjs) => {},
  showEventModal: false,
  setShowEventModal: (show: boolean) => {},
  dispatchCalEvent: () => {},
  savedEvents: [],
});

export const AppProvider = ({ children }: any) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(dayjs().month());
  const [daySelected, setDaySelected] = useState<dayjs.Dayjs>(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initsEvents
  );

  useEffect(() => {
    savedEvents.length > 0 &&
      localStorage.setItem("events", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  return (
    <AppContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        savedEvents,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
