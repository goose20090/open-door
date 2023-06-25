import React, { useState } from "react";
import { Form, Confirmation, Label, Data } from "../../assets/AppointmentCapsuleStyles";
import { getNextAppointmentDate } from "../../helpers/getNextAppointmentDate";
import DatePickerComponent from "../DatePickerComponent";
import { WEEKDAYS } from "../../data/constants";
import { integerToWeekday } from "../../helpers/integarToWeekday";
import RecurringAppointment from "./RecurringAppointmentInfo";

function RecurringReschedule({ appointment }) {
  const weekDayOpts = WEEKDAYS.filter((day) => day !== "Sunday" && day !== "Saturday");
  const [weekDay, setWeekDay] = useState(appointment.week_day);

  console.log(appointment);

  return (
    <Form>
      <Confirmation>
        Reschedule this {appointment.recurring ? "recurring" : "single"} appointment?
      </Confirmation>
      <select value={weekDay} onChange={(e) => setWeekDay(e.target.value)}>
        {weekDayOpts.map((day, index) => (
          <option key={index} value={index}>
            {day}
          </option>
        ))}
      </select>

      <fieldset>
        <input type="radio"></input>
        <input type="radio"></input>
        <input type="radio"></input>
        <input type="radio"></input>
        <input type="radio"></input>
        <input type="radio"></input>
        <input type="radio"></input>
        <input type="radio"></input>
      </fieldset>

      <RecurringAppointment appointment={appointment} />
    </Form>
  );
}

export default RecurringReschedule;
