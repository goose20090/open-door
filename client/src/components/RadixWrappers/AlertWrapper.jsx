import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styled from "styled-components";
import { RedButton, Button } from "../../assets/Buttons";
import { useDeleteAppointmentMutation } from "../../hooks/useDeleteAppointmentMutation";
import { useRollbackMutation } from "../../hooks/useRollbackMutation";

export default function AlertWrapper({ open, setOpen, appointment }) {
  const deleteAppointment = useDeleteAppointmentMutation(appointment);
  const rollbackAppointment = useRollbackMutation(appointment);

  function renderTitle() {
    if (appointment.status === "pending" && !!appointment.rescheduled_by) {
      return "Reschedule Request";
    }
    if (appointment.status === "confirmed") {
      return "Appointment";
    }
    if (appointment.status === "pending" || appointment.status === "rejected") {
      return "Request";
    }
  }
  function renderDescription() {
    if (appointment.status === "pending" && !!appointment.rescheduled_by) {
      return "This deletes your reschedule request. The appointment will revert to its original time.";
    }
    if (appointment.status === "confirmed") {
      return "This deletes the booking entirely and cannot be undone.";
    }
    if (appointment.status === "rejected" || appointment.status === "pending") {
      return "This deletes the request entirely and cannot be undone";
    }
  }
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        <AlertOverlay onClick={() => setOpen(false)} />
        <AlertContent>
          <AlertTitle>Delete {renderTitle()}?</AlertTitle>
          <AlertDescription>{renderDescription()}</AlertDescription>
          <ButtonWrapper>
            <AlertDialog.Cancel asChild>
              <MauveButton>Cancel</MauveButton>
            </AlertDialog.Cancel>
            <AlertDialog.Action
              asChild
              onClick={() => {
                !!appointment.rescheduled_by
                  ? rollbackAppointment.mutate(appointment)
                  : deleteAppointment.mutate(appointment);
              }}
            >
              <RedButton>{appointment.status === "pending" ? "Cancel" : "Delete"}</RedButton>
            </AlertDialog.Action>
          </ButtonWrapper>
        </AlertContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const AlertContent = styled(AlertDialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const AlertTitle = styled(AlertDialog.Title)`
  margin: 0;
  color: var(--mauve12);
  font-size: 17px;
  font-weight: 500;
`;

const AlertOverlay = styled(AlertDialog.Overlay)`
  background-color: var(--blackA9);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const AlertDescription = styled(AlertDialog.Description)`
  margin-bottom: 20px;
  color: var(--mauve11);
  font-size: 15px;
  line-height: 1.5;
`;

const MauveButton = styled(Button)`
  background-color: var(--mauve4);
  color: var(--mauve11);
  margin-right: 5%;
  &:hover {
    background-color: var(--mauve5);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--mauve7);
  }
`;
