import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { relativeDate } from "../../helpers/relativeDate";
import { isFutureDate } from "../../helpers/isFutureDate";
import DialogWrapper from "../../components/RadixWrappers/DialogWrapper";
import { useAuthQuery } from "../../hooks/useAuthQuery";
import { UserContext } from "../../context/user";
import AppointmentsLayout from "../TherapistsHub/Tabs/AppointmentsLayout";
import { BookingButton, GreenButton, VioletButton, BlueButton } from "../../assets/Buttons";
import { useDialog } from "../../hooks/useDialog";
import NewAppointmentForm from "../../components/NewAppointmentForm";
import AppointmentCapsule from "../../components/AppointmentCapsule/AppointmentCapsule";
import { useHistory } from "react-router-dom";
import { useToast } from "../../hooks/useToast";

export default function ClientHub() {
  const { isLoading, isError } = useAuthQuery(false);
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { addToast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!user || user.user_type === "Therapist") {
      history.push("/");
      addToast("unauthorised");
    }
  }, [user, history, addToast]);

  if (isLoading) return <p>Loading...</p>;

  const { appointments } = user;

  const recurringAppointments = appointments
    .filter(
      (appointment) =>
        appointment.recurring && appointment.rejected_by !== user.user_type.toLowerCase()
    )
    .map((appointment) => <AppointmentCapsule key={appointment.id} appointment={appointment} />);

  const singleAppointments = appointments
    .filter(
      (appointment) =>
        !appointment.recurring && appointment.rejected_by !== user.user_type.toLowerCase()
    )
    .map((appointment) => <AppointmentCapsule key={appointment.id} appointment={appointment} />);
  return (
    <Wrapper>
      <Grid>
        <UserSidebar>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <SidebarContent>
              <Heading>
                <Name>My Appointments</Name>
                <TotalAppointments>
                  Total: {recurringAppointments.length + singleAppointments.length}
                </TotalAppointments>
              </Heading>
              <DialogWrapper open={dialogOpen} setOpen={setDialogOpen}>
                <NewAppointmentForm onCloseDialog={() => setDialogOpen(false)} />
              </DialogWrapper>
              <SubmitButton onClick={() => setDialogOpen(true)}>Book an Appointment</SubmitButton>
            </SidebarContent>
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

const Heading = styled.div`
  padding: 16px;
  padding-top: 4px;
  display: flex;
  flex-direction: column;
`;
const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* height: fit-content; */
`;

const SubmitButton = styled(GreenButton)`
  width: 80%;
  margin-top: 14px;
  align-self: center;
  /* height: 100px; */
  box-shadow: inset 0 0 0 2px var(--green7);
`;
const UserSidebar = styled.aside`
  background-color: white;
  grid-area: sidebar;
  height: 100%;
`;

const TotalAppointments = styled.p`
  margin: 0px;
  color: rgb(104, 112, 118);
  font-size: 0.9rem;
  padding-top: 9px;
  line-height: 1.3;
`;
const Name = styled.h2`
  /* align-self: center; */
`;
const UserAppointmentsLayout = styled(AppointmentsLayout)`
  grid-area: appointments;
  height: 100%;
`;

const Wrapper = styled.div`
  height: 80%;
  position: relative;
`;
const Grid = styled.div`
  --shadow-color: 176deg 27% 46%;
  box-shadow: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),
    0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.36),
    2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.36),
    5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.36);

  position: absolute;
  overflow: auto;
  border: 1px solid var(--blackA7);
  border-radius: 25px;
  top: 25px;
  left: 10%;
  right: 10%;
  bottom: 0;
  display: grid;
  background-color: var(--blackA7);
  gap: 1px;
  grid-template-columns: 250px 1fr;
  /* grid-template-rows: 4rem 1fr 4rem 1fr; */
  grid-template-areas: "sidebar appointments";
`;

const NewAppointments = styled.section`
  background-color: white;
  grid-area: new;
`;
