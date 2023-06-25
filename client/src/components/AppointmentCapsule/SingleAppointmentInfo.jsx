import React from "react";
import { Label, Data } from "../../assets/AppointmentCapsuleStyles";

export default function SingleAppointmentInfo({ appointment }) {
  return (
    <>
      <Label as="label">
        Time: <Data>{appointment.start_time}:00</Data>
      </Label>
      <Label as="label">
        Date: <Data>{new Date(appointment.date).toLocaleDateString()}</Data>
      </Label>
    </>
  );
}
