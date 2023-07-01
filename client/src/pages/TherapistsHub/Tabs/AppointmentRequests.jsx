import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import AppointmentsLayout from "./AppointmentsLayout";
import AppointmentCapsule from "../../../components/AppointmentCapsule/AppointmentCapsule";

function AppointmentRequests() {
  const authQuery = useQuery(["user", "authorisation"], () => null, {
    enabled: false,
  });

  const { data: user, isLoading, isError } = authQuery;
  const { appointments } = user;

  const recurringAppointmentRequests = appointments
    .filter(
      (appointment) =>
        appointment.recurring &&
        appointment.status !== "confirmed" &&
        appointment.rejected_by !== user.user_type.toLowerCase()
    )
    .map((appointment) => <AppointmentCapsule key={appointment.id} appointment={appointment} />);

  const singleAppointmentRequests = appointments
    .filter(
      (appointment) =>
        !appointment.recurring &&
        appointment.status !== "confirmed" &&
        appointment.rejected_by !== user.id
    )
    .map((appointment) => <AppointmentCapsule key={appointment.id} appointment={appointment} />);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <AppointmentsLayout
      recurringContent={recurringAppointmentRequests}
      singleContent={singleAppointmentRequests}
      contentType={"appointment requests"}
    />
  );
}

const Wrapper = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
  padding: 16px;
  justify-content: space-around;
`;

export default AppointmentRequests;
