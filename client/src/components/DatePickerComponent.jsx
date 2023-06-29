import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { getFridayNextWeek } from "../helpers/getNextFriday";
import { isSameDay } from "date-fns";
import { getNextWorkingDay } from "../helpers/getNextWorkingDay";

import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerComponent({ enabled, startDate, setStartDate, setWeekDay }) {
  const nextWorkingDay = getNextWorkingDay();
  const minDate = nextWorkingDay;

  const maxDate = enabled ? null : nextWorkingDay;

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <DatePicker
      inline
      selected={enabled ? startDate : null}
      onChange={(date) => {
        setStartDate(date);
      }}
      filterDate={isWeekday}
      minDate={minDate}
      maxDate={maxDate}
      calendarStartDay={1}
    />
  );
}
