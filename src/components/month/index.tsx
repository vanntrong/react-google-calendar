import Day from "components/day";
import { Dayjs } from "dayjs";
import React, { FC } from "react";

interface MonthProps {
  month: Dayjs[][]; // 2D array of days
}

const Month: FC<MonthProps> = ({ month }) => {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((day, _index) => (
            <Day day={day} key={_index} rowIndex={index} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;
