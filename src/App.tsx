import CalendarHeader from "components/calendar-header";
import EventModal from "components/event-modal";
import Month from "components/month";
import Sidebar from "components/sidebar";
import { AppContext } from "context/app.context";
import { Dayjs } from "dayjs";
import { useContext, useEffect, useState } from "react";
import { getMonth } from "utils";

function App() {
  const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>();
  const { monthIndex, showEventModal } = useContext(AppContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showEventModal && <EventModal />}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          {currentMonth && <Month month={currentMonth} />}
        </div>
      </div>
    </>
  );
}

export default App;
