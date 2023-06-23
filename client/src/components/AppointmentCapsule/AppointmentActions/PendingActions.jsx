import React, { useState } from "react";
import TooltipWrapper from "../../RadixWrappers/TooltipWrapper";
import { Cross2Icon } from "@radix-ui/react-icons";
import { StyledCheckIcon } from "../NewAppointmentCapsule";
import { ConfirmButton, DenyButton } from "../../../assets/Buttons";
import DialogWrapper from "../../RadixWrappers/DialogWrapper";
import ConfirmAppointmentForm from "../ConfirmDialogContent";
export function PendingOptionsButtons({ appointment }) {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <DialogWrapper
        action={"Confirm"}
        content={ConfirmAppointmentForm}
        contentProps={{ appointment: appointment }}
      >
        <TooltipWrapper textContent={"Confirm Appointment"} sideOffset={5}>
          <ConfirmButton>
            <StyledCheckIcon />
          </ConfirmButton>
        </TooltipWrapper>
      </DialogWrapper>
      <TooltipWrapper textContent={"Reject Appointment"}>
        <DenyButton>
          <Cross2Icon />
        </DenyButton>
      </TooltipWrapper>
    </>
  );
}
