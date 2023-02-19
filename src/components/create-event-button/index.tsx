import React, { useContext } from "react";
import Plus from "assets/plus.svg";
import { AppContext } from "context/app.context";

const CreateEventButton = () => {
  const { setShowEventModal } = useContext(AppContext);
  return (
    <button
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl transition-all"
      onClick={() => setShowEventModal(true)}
    >
      <img src={Plus} alt="plus" className="w-7 h-7" />
      <span className="pl-3 pr-7">Create</span>
    </button>
  );
};

export default CreateEventButton;
