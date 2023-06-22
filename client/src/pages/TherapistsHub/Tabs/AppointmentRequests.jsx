import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import AppointmentCapsule from "../../../components/AppointmentCapsule";

function AppointmentRequests() {
  const authQuery = useQuery(["user", "authorisation"], () => null, {
    enabled: false,
  });

  const { data: user, isLoading, isError } = authQuery;
  const { appointments } = user;

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <Wrapper>
      {appointments.map((appointment) => (
        <AppointmentCapsule key={appointment.id} appointment={appointment} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  justify-content: space-around;
`;

export default AppointmentRequests;
