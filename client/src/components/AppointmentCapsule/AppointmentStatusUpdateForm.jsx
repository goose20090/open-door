import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { formatRecurringTime } from "../../helpers/formatRecurringTime";
import { Title } from "../../assets/AppointmentCapsuleStyles";
import { formatSingleDate } from "../../helpers/formatSingleDate";
import { integerToWeekday } from "../../helpers/integarToWeekday";
import fetchWithError from "../../helpers/fetchWithError";
import {
  Label,
  Data,
  Form,
  SubmitButton,
  Confirmation,
} from "../../assets/AppointmentCapsuleStyles";
export default function AppointmentStatusUpdateForm({ appointment, action }) {
  const queryClient = useQueryClient();
  let dateTimeContent;

  if (appointment.recurring) {
    dateTimeContent = (
      <>
        <Label as="label">
          Time: <Data>{appointment.start_time}:00</Data>
        </Label>
        <Label>
          Weekday: <Data>{integerToWeekday(appointment.week_day)}</Data>
        </Label>
      </>
    );
  } else {
    dateTimeContent = (
      <>
        <Label as="label">
          Time: <Data>{appointment.start_time}:00</Data>
        </Label>
        <Label as="label">
          Date: <Data>{new Date(appointment.date).toLocaleDateString()}</Data>
        </Label>
      </>
    );
  }

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
      <Label as="label">
        Client Name: <Data> {appointment.client.name}</Data>
      </Label>
      {dateTimeContent}
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
}
