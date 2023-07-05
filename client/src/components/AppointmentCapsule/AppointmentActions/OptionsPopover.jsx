import React, { useState } from "react";
import styled from "styled-components";
import {
  CancelButton as DeleteButton,
  RescheduleButton,
} from "../../../assets/AppointmentCapsuleStyles";
import { PopoverWrapper } from "../../RadixWrappers/PopoverWrapper";
import DialogWrapper from "../../RadixWrappers/DialogWrapper";
import { useDialog } from "../../../hooks/useDialog";
import AppointmenRescheduleForm from "../../AppointmentRescheduleForm";
import AlertWrapper from "../../RadixWrappers/AlertWrapper";

export default function OptionsPopover({ appointment }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  function renderDeleteButtonText() {
    if (appointment.status === "rejected") {
      return "Delete Request";
    }
    if (appointment.status === "pending") {
      return "Cancel Request";
    }
    if (appointment.status === "confirmed") {
      return "Delete Appointment";
    }
  }

  function renderRescheduleButtonText() {
    if (appointment.status === "rejected") {
      return "Try another time";
    }
    if (appointment.status === "pending") {
      return "Alter request";
    }
    if (appointment.status === "confirmed") {
      return "Request reschedule";
    }
  }
  return (
    <div style={{ minWidth: "64px", display: "flex", justifyContent: "right" }}>
      <PopoverWrapper open={popoverOpen} setOpen={setPopoverOpen}>
        <ButtonsWrapper>
          <DeleteButton id="cancel-button" onClick={() => setAlertOpen(true)}>
            {renderDeleteButtonText()}
          </DeleteButton>

          <RescheduleButton
            id="reschedule-button"
            status={!!appointment.rescheduled_by ? "reschedule" : appointment.status}
            onClick={() => setDialogOpen(true)}
          >
            {renderRescheduleButtonText()}
          </RescheduleButton>
        </ButtonsWrapper>
      </PopoverWrapper>
      <DialogWrapper open={dialogOpen} setOpen={setDialogOpen}>
        <AppointmenRescheduleForm
          appointment={appointment}
          onCloseDialog={() => setDialogOpen(false)}
        />
      </DialogWrapper>
      <AlertWrapper open={alertOpen} setOpen={setAlertOpen} appointment={appointment} />
    </div>
  );
}

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
