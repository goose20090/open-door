import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../context/user";
import NewAppointmentCapsule from "../../../components/NewAppointmentCapsule";

export default function TherapistAppointments() {
  const { user } = useContext(UserContext);
  const { appointments } = user;
  return (
    <Grid>
      <RegularHeaderWrapper>
        <Heading>Regular Appointments</Heading>
      </RegularHeaderWrapper>
      <RegularAppointments>
        {appointments.map((appointment) =>
          appointment.recurring ? <NewAppointmentCapsule appointment={appointment} /> : null
        )}
      </RegularAppointments>
      <SingleHeaderWrapper>
        <Heading>One-off</Heading>
      </SingleHeaderWrapper>
      <SingleAppointments>
        {appointments.map((appointment) =>
          !appointment.recurring ? <NewAppointmentCapsule appointment={appointment} /> : null
        )}
      </SingleAppointments>
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2.5rem 1fr;
  gap: 1px;
  position: relative;
  height: 100%;
  background-color: black;
  grid-template-areas:
    "heading1 heading2"
    "regular single";
`;

const RegularAppointments = styled.div`
  background-color: lightblue;
  grid-area: regular;
  overflow: auto;
  padding: 8px;
`;

const SingleAppointments = styled.div`
  background-color: lightblue;
  grid-area: single;
`;

const Header = styled.header`
  background-color: lightblue;
  padding: 6px;
  margin-bottom: -1px;
`;

const RegularHeaderWrapper = styled(Header)`
  grid-area: heading1;
`;
const SingleHeaderWrapper = styled(Header)`
  grid-area: heading2;
`;

const Heading = styled.h3``;
