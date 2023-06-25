import React from "react";
import { integerToWeekday } from "../../helpers/integarToWeekday";
import { Label, Data } from "../../assets/AppointmentCapsuleStyles";

export default function RecurringAppointmentInfo({ appointment }) {
  return (
    <>
      <Label as="label">
        Client Name: <Data> {appointment.client.name}</Data>
      </Label>
      <Label as="label">
        Time: <Data>{appointment.start_time}:00</Data>
      </Label>
      <Label>
        Weekday: <Data>{integerToWeekday(appointment.week_day)}</Data>
      </Label>
    </>
  );
}
