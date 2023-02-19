import CreateEventButton from "components/create-event-button";
import SmallCalendar from "components/small-calendar";
import React from "react";

const Sidebar = () => {
  return (
    <aside className="border p-5 w-64">
      <CreateEventButton />
      <SmallCalendar />
    </aside>
  );
};

export default Sidebar;
