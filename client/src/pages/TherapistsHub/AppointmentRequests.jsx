import React from "react";
import { useQuery } from "@tanstack/react-query";
import AppointmentCapsule from "../../components/AppointmentCapsule";

function AppointmentRequests() {
  const authQuery = useQuery(["user", "authorisation"], () => null, {
    enabled: false,
  });

  const { data: user, isLoading, isError } = authQuery;
  const { appointments } = user;

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    appointments.map((appointment) => (
      <AppointmentCapsule key={appointment.id} appointment={appointment} />
    ))
  );
}

export default AppointmentRequests;
