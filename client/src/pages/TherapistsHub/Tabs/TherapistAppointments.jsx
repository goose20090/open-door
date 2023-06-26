import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../context/user";
import NewAppointmentCapsule from "../../../components/AppointmentCapsule/NewAppointmentCapsule";
import AppointmentsLayout from "./AppointmentsLayout";

export default function TherapistAppointments() {
  const { user } = useContext(UserContext);
  const { appointments } = user;
  const recurringAppointments = appointments
    .filter((appointment) => appointment.recurring && appointment.status === "confirmed")
    .map((appointment) => <NewAppointmentCapsule key={appointment.id} appointment={appointment} />);

  const singleAppointments = appointments
    .filter((appointment) => !appointment.recurring && appointment.status === "confirmed")
    .map((appointment) => <NewAppointmentCapsule key={appointment.id} appointment={appointment} />);

  return (
    <AppointmentsLayout
      recurringContent={recurringAppointments}
      singleContent={singleAppointments}
      contentType={"appointments"}
    />
  );
}
