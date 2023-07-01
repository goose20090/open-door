import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../context/user";
import AppointmentsLayout from "./AppointmentsLayout";
import AppointmentCapsule from "../../../components/AppointmentCapsule/AppointmentCapsule";

export default function TherapistAppointments() {
  const { user } = useContext(UserContext);
  const { appointments } = user;
  const recurringAppointments = appointments
    .filter((appointment) => appointment.recurring && appointment.status === "confirmed")
    .map((appointment) => <AppointmentCapsule key={appointment.id} appointment={appointment} />);

  const singleAppointments = appointments
    .filter((appointment) => !appointment.recurring && appointment.status === "confirmed")
    .map((appointment) => <AppointmentCapsule key={appointment.id} appointment={appointment} />);

  return (
    <AppointmentsLayout
      recurringContent={recurringAppointments}
      singleContent={singleAppointments}
      contentType={"appointments"}
    />
  );
}
