import React, { useState } from "react";
import TooltipWrapper from "../../RadixWrappers/TooltipWrapper";
import { Cross2Icon } from "@radix-ui/react-icons";
import { StyledCheckIcon } from "../../../assets/NewAppointmentStyles";
import { ConfirmButton, DenyButton } from "../../../assets/Buttons";
import DialogWrapper from "../../RadixWrappers/DialogWrapper";
import AppointmentStatusUpdateForm from "../../AppointmentStatusUpdateForm";
export function PendingOptionsButtons({ appointment }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [action, setAction] = useState("");
  return (
    <>
      <TooltipWrapper textContent={"Confirm Appointment"} sideOffset={5}>
        <ConfirmButton
          onClick={() => {
            setDialogOpen(true);
            setAction("Confirm");
          }}
        >
          <StyledCheckIcon />
        </ConfirmButton>
      </TooltipWrapper>
      <TooltipWrapper textContent={"Reject Appointment"} sideOffset={5}>
        <DenyButton
          onClick={() => {
            setDialogOpen(true);
            setAction("Reject");
          }}
        >
          <Cross2Icon />
        </DenyButton>
      </TooltipWrapper>
      <DialogWrapper open={dialogOpen} setOpen={setDialogOpen}>
        <AppointmentStatusUpdateForm appointment={appointment} action={action} />
      </DialogWrapper>
    </>
  );
}
