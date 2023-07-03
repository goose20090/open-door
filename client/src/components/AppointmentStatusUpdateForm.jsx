import React, { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { formatRecurringTime } from "../helpers/formatRecurringTime";
import { Title } from "../assets/AppointmentCapsuleStyles";
import { formatSingleDate } from "../helpers/formatSingleDate";
import fetchWithError from "../helpers/fetchWithError";
import RecurringAppointmentInfo from "./AppointmentCapsule/RecurringAppointmentInfo";
import { Form, SubmitButton, Confirmation } from "../assets/AppointmentCapsuleStyles";
import SingleAppointmentInfo from "./AppointmentCapsule/SingleAppointmentInfo";
import { UserContext } from "../context/user";
import { useUpdateStatusMutation } from "../hooks/useUpdateStatusMutation";

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

  function handleSubmit(e) {
    e.preventDefault();
    statusMutation.mutate();
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Confirmation>
        {action} this {updateType}?
      </Confirmation>
      {appointment.recurring ? (
        <RecurringAppointmentInfo appointment={appointment} />
      ) : (
        <SingleAppointmentInfo appointment={appointment} />
      )}
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
}
