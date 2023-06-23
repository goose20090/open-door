import React from "react";
import TooltipWrapper from "../../RadixWrappers/TooltipWrapper";
import { Cross2Icon } from "@radix-ui/react-icons";
import { StyledCheckIcon } from "../NewAppointmentCapsule";
import { ConfirmButton, DenyButton } from "../../../assets/Buttons";
import DialogWrapper from "../../RadixWrappers/DialogWrapper";
import ConfirmAppointmentForm from "../ConfirmDialogContent";
export function PendingOptionsButtons({ appointment }) {
  return (
    <>
      <TooltipWrapper textContent={"Confirm Appointment"}>
        <DialogWrapper
          action={"Confirm"}
          content={ConfirmAppointmentForm}
          contentProps={{ appointment: appointment }}
        >
          <ConfirmButton>
            <StyledCheckIcon />
          </ConfirmButton>
        </DialogWrapper>
      </TooltipWrapper>
      <TooltipWrapper textContent={"Reject Appointment"}>
        <DenyButton>
          <Cross2Icon />
        </DenyButton>
      </TooltipWrapper>
    </>
  );
}
