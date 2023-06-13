import React, { useContext } from "react";
import { UserContext } from "../../context/user";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { relativeDate } from "../../helpers/relativeDate";
import { isFutureDate } from "../../helpers/isFutureDate";
import { formatDate } from "../../helpers/formatDate";
import AppointmentCapsule from "../../components/AppointmentCapsule";
import BookingDialog from "./BookingDialog";

export default function AppointmentsHub() {
  const { user, setUser } = useContext(UserContext);

  const authQuery = useQuery(["user", "authorisation"], () => null, {
    enabled: false,
  });

  const { isLoading, isError } = authQuery;

  const { appointments } = user;
  return (
    <Wrapper>
      <Grid>
        <UserSidebar>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p>Total appointments: {appointments.length}</p>
              <BookingDialog />
            </>
          )}
        </UserSidebar>
        <ComingAppointmentsHeader>Future Appointments</ComingAppointmentsHeader>
        <ComingAppointments>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            appointments.map((appointment) =>
              isFutureDate(appointment.start_time) ? (
                <AppointmentCapsule
                  key={appointment.id}
                  appointment={appointment}
                />
              ) : null
            )
          )}
        </ComingAppointments>
        <PastAppointmentsHeader>Past Appointments</PastAppointmentsHeader>
        <PastAppointments>
          <>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              appointments.map((appointment) =>
                !isFutureDate(appointment.start_time) ? (
                  <AppointmentCapsule
                    key={appointment.id}
                    appointment={appointment}
                  />
                ) : null
              )
            )}
          </>
        </PastAppointments>
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 80%;
  position: relative;
`;
const Grid = styled.div`
  --shadow-color: 176deg 27% 46%;
  box-shadow: 0.5px 0.6px 0.9px hsl(var(--shadow-color) / 0.36),
    1.7px 2px 3px -0.8px hsl(var(--shadow-color) / 0.36),
    4.4px 5px 7.5px -1.7px hsl(var(--shadow-color) / 0.36),
    10.6px 12.1px 18.1px -2.5px hsl(var(--shadow-color) / 0.36);

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
  grid-template-columns: 250px 1fr;
  grid-template-rows: 4rem 1fr 4rem 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar coming"
    "sidebar header2"
    "sidebar past";

  aside {
    background-color: lightblue;
    grid-area: sidebar;
    padding: 25px;
  }
`;

const UserSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ComingAppointments = styled.section`
  background-color: lightblue;
  grid-area: coming;
  display: grid;
  gap: 16px;
  padding: 16px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`;

const ComingAppointmentsHeader = styled.h2`
  background-color: lightblue;
  grid-area: header;
  padding: 16px;
`;

const PastAppointments = styled.section`
  background-color: lightblue;
  grid-area: past;
  display: grid;
  gap: 16px;
  padding: 16px;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`;

const PastAppointmentsHeader = styled.h2`
  background-color: lightblue;
  grid-area: header2;
  padding: 16px;
`;

const NewAppointments = styled.section`
  background-color: lightblue;
  grid-area: new;
`;
