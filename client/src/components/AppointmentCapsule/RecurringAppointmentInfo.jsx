import React, { useContext } from "react";
import styled from "styled-components";
import { integerToWeekday } from "../../helpers/integarToWeekday";
import { Label, Data } from "../../assets/AppointmentCapsuleStyles";
import { UserContext } from "../../context/user";

export default function RecurringAppointmentInfo({ appointment, name }) {
  const { user } = useContext(UserContext);
  return (
    <div>
      <StyledLabel as="label">
        Client Name:{" "}
        <Data>
          {" "}
          {name
            ? name
            : user.user_type == "Client"
            ? appointment.therapist.name
            : appointment.client.name}
        </Data>
      </StyledLabel>
      <StyledLabel as="label">
        Time: <Data>{appointment.start_time}:00</Data>
      </StyledLabel>
      <StyledLabel>
        Weekday: <Data>{integerToWeekday(appointment.week_day)}</Data>
      </StyledLabel>
    </div>
  );
}

const StyledLabel = styled(Label)`
  font-size: 1rem;
`;
