import React from "react";
import styled from "styled-components";
import { CancelButton, RescheduleButton } from "../../../assets/AppointmentCapsuleStyles";
import { PopoverWrapper } from "../../RadixWrappers/PopoverWrapper";

export default function ConfirmedOptions() {
  return (
    <PopoverWrapper>
      <ButtonsWrapper>
        <CancelButton id="cancel-button">Cancel</CancelButton>
        <RescheduleButton id="reschedule-button">Reschedule</RescheduleButton>
      </ButtonsWrapper>
    </PopoverWrapper>
  );
}

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
