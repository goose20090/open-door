import React from "react";
import styled from "styled-components";
import {
  CancelButton as DeleteButton,
  RescheduleButton,
} from "../../../assets/AppointmentCapsuleStyles";
import { PopoverWrapper } from "../../RadixWrappers/PopoverWrapper";
import DialogWrapper from "../../RadixWrappers/DialogWrapper";
import fetchWithError from "../../../helpers/fetchWithError";
import { useDialog } from "../../../hooks/useDialog";
import AppointmenRescheduleForm from "../../AppointmentRescheduleForm";

export default function OptionsPopover({ appointment }) {
  const { open, openDialog, closeDialog } = useDialog();

  function handleDelete() {
    fetchWithError(`/api/appointments/${appointment.id}`, {
      method: "DELETE",
    });
  }
  return (
    <div style={{ minWidth: "64px", display: "flex", justifyContent: "right" }}>
      <PopoverWrapper>
        <ButtonsWrapper>
          <DeleteButton id="cancel-button" onClick={handleDelete}>
            Delete
          </DeleteButton>
          <DialogWrapper
            open={open}
            onOpenChange={open ? closeDialog : openDialog}
            content={AppointmenRescheduleForm}
            contentProps={{ appointment, onCloseDialog: closeDialog }}
          >
            <RescheduleButton id="reschedule-button">Reschedule</RescheduleButton>
          </DialogWrapper>
        </ButtonsWrapper>
      </PopoverWrapper>
    </div>
  );
}

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
