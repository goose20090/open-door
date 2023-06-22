import React from "react";
import styled from "styled-components";
import { IconButton } from "../assets/Buttons";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon, GearIcon } from "@radix-ui/react-icons";
import {
  Title,
  Time,
  CapButton,
  CancelButton,
  RescheduleButton,
} from "../assets/AppointmentCapsuleStyles";
import { formatRecurringTime } from "../helpers/formatRecurringTime";
import { formatSingleDate } from "../helpers/formatSingleDate";

const integerToWeekday = (day) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];
};

export default function NewAppointmentCapsule({ appointment }) {
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
      <CapButton status={appointment.status} as={"div"}>
        {appointment.status}
      </CapButton>
      <PopoverRoot>
        <Popover.Trigger asChild>
          <GearIcon />
        </Popover.Trigger>
        <Popover.Portal>
          <PopoverContent>
            {/* <Title>Appointment Options</Title> */}
            <ButtonWrapper>
              <CancelButton id="cancel-button">Cancel</CancelButton>
              <RescheduleButton id="reschedule-button">Reschedule</RescheduleButton>
            </ButtonWrapper>
            <Popover.Close asChild>
              <CloseButton>
                <Cross2Icon style={{ height: "12px" }} />
              </CloseButton>
            </Popover.Close>
            <Popover.Arrow />
          </PopoverContent>
        </Popover.Portal>
      </PopoverRoot>
    </Wrapper>
  );
}

const PopoverRoot = styled(Popover.Root)`
  grid-area: status;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Label = styled.label`
  color: rgb(104, 112, 118);
  font-size: 13px;
  line-height: 1.3;
`;

const PopoverContent = styled(Popover.Content)`
  /* width: max-content; */
  border-radius: 6px;
  padding: 10px;
  width: 200px;
  background-color: white;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
`;
const Wrapper = styled.div`
  background-color: white;
  border-radius: 6px;
  /* width: 70%; */
  --shadow-color: 176deg 27% 46%;
  box-shadow: 0.5px 0.6px 0.9px hsl(var(--shadow-color) / 0.34),
    0.9px 1px 1.5px -1.2px hsl(var(--shadow-color) / 0.34),
    2.1px 2.4px 3.6px -2.5px hsl(var(--shadow-color) / 0.34);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  /* display: grid;
  grid-template-areas: "title status" "description status";
  grid-template-columns: auto max-content; */
  column-gap: 15px;
  align-items: center;
  margin: 8px;
`;

const CloseButton = styled(IconButton)`
  top: 3px;
  right: 3px;
  height: 12px;
  width: 12px;
`;
