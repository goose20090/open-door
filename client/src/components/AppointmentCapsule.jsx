import React, { useContext } from "react";
import styled from "styled-components";
import { formatDate } from "../helpers/formatDate";
import { UserContext } from "../context/user";
import fetchWithError from "../helpers/fetchWithError";

export default function AppointmentCapsule({ appointment }) {
  const { user } = useContext(UserContext);
  // const { therapist } = appointment;
  const COLORS = {
    pending: "white",
    rejected: "hsl(360, 100%, 82%, 1)",
    confirmed: "goldenrod",
  };

  function handleAppointmentUpdate() {}
  console.log(appointment.status);
  return (
    <Wrapper style={{ "--color": COLORS[appointment.status] }}>
      <h4>{user.user_type === "Client" ? appointment.therapist.name : appointment.client.name}</h4>
      <span>
        <b>Date:</b>
        {formatDate(appointment.start_time, appointment.date)}
      </span>
      <br />
      <span>Status: {appointment.status}</span>
      {user.user_type === "Therapist" && appointment.status === "pending" ? (
        <>
          <ActionButton buttonAction={"confirm"} appointment={appointment} />
          <ActionButton buttonAction={"reject"} appointment={appointment} />
        </>
      ) : null}
    </Wrapper>
  );
}

function ActionButton({ buttonAction, appointment }) {
  function handleClick() {
    // console.log(action);
    fetchWithError(`/api/appointments/${appointment.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ button_action: buttonAction }),
    });
  }
  return <button onClick={handleClick}>{buttonAction}</button>;
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
  width: fit-content;
  padding: 8px;
`;
