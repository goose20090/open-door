import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { formatRecurringTime } from "../../helpers/formatRecurringTime";
import { Title } from "../../assets/AppointmentCapsuleStyles";
import { formatSingleDate } from "../../helpers/formatSingleDate";
import fetchWithError from "../../helpers/fetchWithError";
import RecurringAppointmentInfo from "./RecurringAppointmentInfo";
import { Form, SubmitButton, Confirmation } from "../../assets/AppointmentCapsuleStyles";
import SingleAppointmentInfo from "./SingleAppointmentInfo";
export default function AppointmentStatusUpdateForm({ appointment, action }) {
  const queryClient = useQueryClient();

  function handleSubmit(e) {
    e.preventDefault();
    fetchWithError(`api/appointments/${appointment.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ status: `${action.toLowerCase()}ed` }),
    }).then(() => queryClient.invalidateQueries(["user"]));
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Confirmation>
        {action} this {appointment.recurring ? "recurring" : "single"} appointment?
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
