import React from "react";
import styled from "styled-components";
import { formatDate } from "../helpers/formatDate";

export default function AppointmentCapsule({ appointment }) {
  const { therapist } = appointment;
  const COLORS = {
    pending: "white",
    cancelled: "salmon",
    confirmed: "goldenrod",
  };
  return (
    <Wrapper style={{ "--color": COLORS[appointment.status] }}>
      <h4>{therapist.name}</h4>
      <span>{formatDate(appointment.start_time, appointment.date)}</span>
      <br />
      <span>Status: {appointment.status}</span>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  --shadow-color: 176deg 27% 46%;
  box-shadow: 0.5px 0.6px 0.9px hsl(var(--shadow-color) / 0.34),
    0.9px 1px 1.5px -1.2px hsl(var(--shadow-color) / 0.34),
    2.1px 2.4px 3.6px -2.5px hsl(var(--shadow-color) / 0.34);
  border: 1px solid black;
  background-color: var(--color);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 8px;
`;
