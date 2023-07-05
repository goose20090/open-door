import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { relativeDate } from "../../helpers/relativeDate";
import { isFutureDate } from "../../helpers/isFutureDate";
import DialogWrapper from "../../components/RadixWrappers/DialogWrapper";
import BookingDialog from "./BookingDialog";
import { useAuthQuery } from "../../hooks/useAuthQuery";
import { UserContext } from "../../context/user";
import AppointmentsLayout from "../TherapistsHub/Tabs/AppointmentsLayout";
import { BookingButton } from "../../assets/Buttons";
import BookingDialogContent from "./BookingDialogContent";
import { useDialog } from "../../hooks/useDialog";
import NewAppointmentForm from "../../components/NewAppointmentForm";
import AppointmentCapsule from "../../components/AppointmentCapsule/AppointmentCapsule";

export default function ClientHub() {
  const { isLoading, isError } = useAuthQuery(false);

  const { user } = useContext(UserContext);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!user) return <Redirect to="/" />;

  // const { data: user, isLoading, isError } = authQuery;
  const { appointments } = user;

  const recurringAppointments = appointments
    .filter(
      (appointment) =>
        appointment.recurring && appointment.rejected_by !== user.user_type.toLowerCase()
      // appointment.rescheduled_by !== user.user_type.toLowerCase() &&
    )
    .map((appointment) => <AppointmentCapsule key={appointment.id} appointment={appointment} />);

  const singleAppointments = appointments
    .filter(
      (appointment) =>
        !appointment.recurring && appointment.rejected_by !== user.user_type.toLowerCase()
      // appointment.rescheduled_by !== user.user_type.toLowerCase() &&
    )
    .map((appointment) => <AppointmentCapsule key={appointment.id} appointment={appointment} />);
  return (
    <Wrapper>
      <Grid>
        <UserSidebar>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p>Total appointments: {recurringAppointments.length + singleAppointments.length}</p>
              <DialogWrapper open={dialogOpen} setOpen={setDialogOpen}>
                <NewAppointmentForm onCloseDialog={() => setDialogOpen(false)} />
              </DialogWrapper>
              <BookingButton onClick={() => setDialogOpen(true)}>Book an Appointment</BookingButton>
            </>
          )}
        </UserSidebar>
        <UserAppointmentsLayout
          recurringContent={recurringAppointments}
          singleContent={singleAppointments}
        />
      </Grid>
    </Wrapper>
  );
}

const UserAppointmentsLayout = styled(AppointmentsLayout)`
  grid-area: appointments;
  height: 100%;
`;

const Wrapper = styled.div`
  height: 80vh;
  position: relative;
`;
const Grid = styled.div`
  --shadow-color: 176deg 27% 46%;
  box-shadow: 0.5px 0.6px 0.9px hsl(var(--shadow-color) / 0.36),
    1.7px 2px 3px -0.8px hsl(var(--shadow-color) / 0.36),
    4.4px 5px 7.5px -1.7px hsl(var(--shadow-color) / 0.36),
    10.6px 12.1px 18.1px -2.5px hsl(var(--shadow-color) / 0.36);

  position: absolute;
  overflow: auto;
  border: 1px solid black;
  border-radius: 25px;
  top: 25px;
  left: 10%;
  right: 10%;
  bottom: 0;
  display: grid;
  background-color: black;
  gap: 1px;
  grid-template-columns: 250px 1fr;
  /* grid-template-rows: 4rem 1fr 4rem 1fr; */
  grid-template-areas: "sidebar appointments";

  aside {
    background-color: lightblue;
    grid-area: sidebar;
    padding: 25px;
  }
`;

const UserSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
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
