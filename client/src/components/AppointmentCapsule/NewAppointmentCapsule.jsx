import React from "react";
import styled from "styled-components";
import { VioletButton } from "../../assets/Buttons";
import * as Popover from "@radix-ui/react-popover";
import { Title, Time, Status } from "../../assets/AppointmentCapsuleStyles";
import { formatRecurringTime } from "../../helpers/formatRecurringTime";
import { formatSingleDate } from "../../helpers/formatSingleDate";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { PendingOptionsButtons } from "./AppointmentActions/PendingOptionsButtons";
import Options from "./AppointmentActions/OptionsPopover";
import OptionsPopover from "./AppointmentActions/OptionsPopover";

const integerToWeekday = (day) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
};

export default function NewAppointmentCapsule({ appointment }) {
  const { status } = appointment;
  function renderOptions() {
    if (status === "pending") {
      return <PendingOptionsButtons appointment={appointment} />;
    } else {
      return <OptionsPopover appointment={appointment} />;
    }
  }

  return (
    <Wrapper>
      <div>
        <Title>{appointment.client.name}</Title>
        {appointment.recurring ? (
          <Time>{formatRecurringTime(appointment.start_time, appointment.week_day)}</Time>
        ) : (
          <Time>{formatSingleDate(appointment.start_time, appointment.date)}</Time>
        )}
      </div>
      <Status status={status} as={"div"}>
        {status}
      </Status>
      {renderOptions()}
    </Wrapper>
  );
}

export const StyledCheckIcon = styled(CheckIcon)`
  height: 18px;
  width: 18px;
`;

export const RejectedConfirmButton = styled(VioletButton)`
  font-size: 12px;
  padding: 0 10px;
  line-height: 25px;
  border: 1px solid var(--violet8);
  height: 23px;
  align-self: center;
`;

const Wrapper = styled.div`
  background-color: white;
  border-radius: 6px;
  /* width: 400px; */
  min-width: 310px;
  max-width: 400px;
  --shadow-color: 176deg 27% 46%;
  box-shadow: 0.5px 0.6px 0.9px hsl(var(--shadow-color) / 0.34),
    0.9px 1px 1.5px -1.2px hsl(var(--shadow-color) / 0.34),
    2.1px 2.4px 3.6px -2.5px hsl(var(--shadow-color) / 0.34);
  padding: 15px;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  /* display: grid;
  grid-template-areas: "title status" "description status";
  grid-template-columns: auto max-content; */
  column-gap: 15px;
  align-items: center;
  margin: 8px;
`;
