import React from "react";
import styled from "styled-components";
import {
  CancelButton as DeleteButton,
  RescheduleButton,
} from "../../../assets/AppointmentCapsuleStyles";
import { PopoverWrapper } from "../../RadixWrappers/PopoverWrapper";
import DialogWrapper from "../../RadixWrappers/DialogWrapper";
import AppointmentRescheduleForm from "../AppointmentRescheduleForm";

export default function OptionsPopover({ appointment }) {
  return (
    <PopoverWrapper>
      <ButtonsWrapper>
        <DeleteButton id="cancel-button">Delete</DeleteButton>
        <DialogWrapper
          content={AppointmentRescheduleForm}
          contentProps={{ appointment: appointment }}
        >
          <RescheduleButton id="reschedule-button">Reschedule</RescheduleButton>
        </DialogWrapper>
      </ButtonsWrapper>
    </PopoverWrapper>
  );
}

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
