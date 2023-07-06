import React, { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { formatRecurringTime } from "../helpers/formatRecurringTime";
import { Title, Time } from "../assets/AppointmentCapsuleStyles";
import { formatSingleDate } from "../helpers/formatSingleDate";
import fetchWithError from "../helpers/fetchWithError";
import RecurringAppointmentInfo from "./AppointmentCapsule/RecurringAppointmentInfo";
import { RescheduleStatus, NewAppointment } from "./AppointmentRescheduleForm";
import SingleAppointmentInfo from "./AppointmentCapsule/SingleAppointmentInfo";
import { UserContext } from "../context/user";
import { useUpdateStatusMutation } from "../hooks/useUpdateStatusMutation";
import { ka } from "date-fns/locale";
import { GreenButton, RedButton } from "../assets/Buttons";

export default function AppointmentStatusUpdateForm({ appointment, action }) {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const statusMutation = useUpdateStatusMutation(appointment, action);
  let statusUpdateObj;
  let updateType;
  if (!!appointment.rescheduled_by) {
    updateType = "reschedule request";
  } else {
    updateType = appointment.recurring ? "recurring appointment" : "single appointment";
  }
  const requestRecipient =
    user.user_type === "Client" ? appointment.therapist.name : appointment.client.name;

  function handleSubmit(e) {
    e.preventDefault();
    statusMutation.mutate();
  }
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <StatusUpdateTitle>
        {action} this {updateType}?
      </StatusUpdateTitle>
      <Appointment>
        <div>
          <Title>{requestRecipient}</Title>
          <Time>
            {appointment.recurring
              ? formatRecurringTime(appointment.start_time, appointment.week_day)
              : formatSingleDate(appointment.start_time, appointment.date)}
          </Time>
        </div>
        {!!appointment.rescheduled_by ? (
          <>
            <RescheduleStatus as="div" status={"pending"}>
              pending
            </RescheduleStatus>
            <RescheduleStatus as="div" status={"reschedule"}>
              reschedule
            </RescheduleStatus>
          </>
        ) : (
          <RescheduleStatus as="div" status={"pending"}>
            pending
          </RescheduleStatus>
        )}
      </Appointment>
      {action === "Confirm" ? (
        <ConfirmButton>{action}</ConfirmButton>
      ) : (
        <RejectButton>{action}</RejectButton>
      )}
    </FormWrapper>
  );
}

const Appointment = styled(NewAppointment)`
  grid-area: appointment;
  align-self: center;
  justify-self: center;
`;

const FormWrapper = styled.form`
  display: grid;
  height: 30vh;
  grid-template-columns: 1fr;
  grid-template-rows: 2rem 1fr 40px;
  grid-template-areas:
    "title"
    "appointment"
    "submit";
`;

const StatusUpdateTitle = styled(Title)`
  margin-top: 8px;
  font-size: 1.4rem;
`;

const ConfirmButton = styled(GreenButton)`
  grid-area: submit;
  width: 100%;
  padding: 0;
  align-self: end;
`;

const RejectButton = styled(RedButton)`
  grid-area: submit;
  width: 100%;
  padding: 0;
  align-self: end;
`;
