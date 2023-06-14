import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { getFridayNextWeek } from "../helpers/getNextFriday";

import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerComponent({
  therapistSelected,
  startDate,
  setStartDate,
  setWeekDay,
}) {
  const today = new Date();

  const minDate = therapistSelected ? new Date() : today;

  const maxDate = therapistSelected ? getFridayNextWeek() : today;

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <DatePicker
      inline
      selected={therapistSelected ? startDate : null}
      onChange={(date) => {
        setStartDate(date);
        setWeekDay(
          date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
        );
      }}
      filterDate={isWeekday}
      minDate={minDate}
      maxDate={maxDate}
      calendarStartDay={1}
    />
  );
}
