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
import { useMutation } from "@tanstack/react-query";
import { useDeleteAppointmentMutation } from "../../../hooks/useDeleteAppointmentMutation";

export default function OptionsPopover({ appointment }) {
  const { open, openDialog, closeDialog } = useDialog();
  const deleteAppointment = useDeleteAppointmentMutation(appointment);

  return (
    <div style={{ minWidth: "64px", display: "flex", justifyContent: "right" }}>
      <PopoverWrapper>
        <ButtonsWrapper>
          <DeleteButton id="cancel-button" onClick={() => deleteAppointment.mutate(appointment)}>
            Delete
          </DeleteButton>
          <DialogWrapper
            open={open}
            onOpenChange={open ? closeDialog : openDialog}
            content={AppointmenRescheduleForm}
            contentProps={{ appointment, onCloseDialog: closeDialog }}
          >
            <RescheduleButton id="reschedule-button">
              {appointment.status === "rejected" ? "Try another time" : "Reschedule"}
            </RescheduleButton>
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
