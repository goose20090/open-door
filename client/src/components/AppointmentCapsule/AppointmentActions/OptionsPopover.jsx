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
import { useRollbackMutation } from "../../../hooks/useRollbackMutation";

export default function OptionsPopover({ appointment }) {
  const { open, openDialog, closeDialog } = useDialog();
  const deleteAppointment = useDeleteAppointmentMutation(appointment);
  const rollbackAppointment = useRollbackMutation(appointment);

  function renderDeleteButtonText() {
    if (appointment.status === "rejected") {
      return "Delete Request";
    }
    if (appointment.status === "pending") {
      return "Cancel Request";
    }
    if (appointment.status === "confirmed") {
      return "Cancel Appointment";
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
      <PopoverWrapper>
        <ButtonsWrapper>
          <DeleteButton
            id="cancel-button"
            onClick={() =>
              !!appointment.rescheduled_by
                ? rollbackAppointment.mutate(appointment)
                : deleteAppointment.mutate(appointment)
            }
          >
            {renderDeleteButtonText()}
          </DeleteButton>
          <DialogWrapper
            open={open}
            onOpenChange={open ? closeDialog : openDialog}
            content={AppointmenRescheduleForm}
            contentProps={{ appointment, onCloseDialog: closeDialog }}
          >
            <RescheduleButton
              id="reschedule-button"
              status={!!appointment.rescheduled_by ? "reschedule" : appointment.status}
            >
              {renderRescheduleButtonText()}
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
