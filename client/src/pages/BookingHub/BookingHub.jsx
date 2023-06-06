import React, { useContext } from "react";
import { UserContext } from "../../context/user";
import styled from "styled-components";
import { relativeDate } from "../../helpers/relativeDate";
import { isFutureDate } from "../../helpers/isFutureDate";

export default function BookingHub() {
  const { user, setUser } = useContext(UserContext);

  const { appointments } = user;
  return (
    <Wrapper>
      <Grid>
        <aside>Aside</aside>
        <ComingAppointments>
          <>
            <h2>Future Appointments</h2>
            {appointments.map((appointment) =>
              isFutureDate(appointment.start_time) ? (
                <p key={appointment.id}>
                  Appointment id: {appointment.id}, date:
                  {relativeDate(appointment.start_time)}
                </p>
              ) : null
            )}
          </>
        </ComingAppointments>
        <PastAppointments>
          <>
            <h2>Past Appointments</h2>
            {appointments.map((appointment) =>
              !isFutureDate(appointment.start_time) ? (
                <p key={appointment.id}>
                  Appointment id: {appointment.id}, date:
                  {relativeDate(appointment.start_time)}
                </p>
              ) : null
            )}
          </>
        </PastAppointments>
        <NewAppointments>Create A New Appointment</NewAppointments>
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 80%;
  position: relative;
`;
const Grid = styled.div`
  box-shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.38);
  position: absolute;
  overflow: hidden;
  border: 2px solid black;
  border-radius: 25px;
  top: 25px;
  left: 10%;
  right: 10%;
  bottom: 0;
  display: grid;
  background-color: black;
  gap: 2px;
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "sidebar coming new "
    "sidebar past new";

  aside {
    background-color: lightblue;
    grid-area: sidebar;
    padding: 25px;
  }
`;

const ComingAppointments = styled.section`
  background-color: lightblue;
  grid-area: coming;
`;

const PastAppointments = styled.section`
  background-color: lightblue;
  grid-area: past;
`;

const NewAppointments = styled.section`
  background-color: lightblue;
  grid-area: new;
`;
