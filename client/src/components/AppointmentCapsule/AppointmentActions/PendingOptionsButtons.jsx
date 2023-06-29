import React, { useState } from "react";
import TooltipWrapper from "../../RadixWrappers/TooltipWrapper";
import { Cross2Icon } from "@radix-ui/react-icons";
import { StyledCheckIcon } from "../../../assets/NewAppointmentStyles";
import { ConfirmButton, DenyButton } from "../../../assets/Buttons";
import DialogWrapper from "../../RadixWrappers/DialogWrapper";
import AppointmentStatusUpdateForm from "../../AppointmentStatusUpdateForm";
export function PendingOptionsButtons({ appointment }) {
  return (
    <>
      <DialogWrapper
        content={AppointmentStatusUpdateForm}
        contentProps={{ appointment: appointment, action: "Confirm" }}
      >
        <TooltipWrapper textContent={"Confirm Appointment"} sideOffset={5}>
          <ConfirmButton>
            <StyledCheckIcon />
          </ConfirmButton>
        </TooltipWrapper>
      </DialogWrapper>
      <DialogWrapper
        content={AppointmentStatusUpdateForm}
        contentProps={{ appointment: appointment, action: "Reject" }}
      >
        <TooltipWrapper textContent={"Reject Appointment"} sideOffset={5}>
          <DenyButton>
            <Cross2Icon />
          </DenyButton>
        </TooltipWrapper>
      </DialogWrapper>
    </>
  );
}
