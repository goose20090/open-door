import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon, GearIcon } from "@radix-ui/react-icons";
import { CancelButton, RescheduleButton } from "../../assets/AppointmentCapsuleStyles";
import { CloseButton, RoundIconButton } from "../../assets/Buttons";

export function PopoverWrapper({ children, open, setOpen }) {
  // const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <OptionsButton>
          <GearIcon />
        </OptionsButton>
      </Popover.Trigger>
      <Popover.Portal>
        <PopoverContent>
          {children}
          <Popover.Close asChild>
            <PositionedCloseButton>
              <Cross2Icon style={{ height: "12px" }} />
            </PositionedCloseButton>
          </Popover.Close>
          <Popover.Arrow />
        </PopoverContent>
      </Popover.Portal>
    </Popover.Root>
  );
}
const OptionsButton = styled(RoundIconButton)`
  border: 0.75px solid var(--blackA7);
  --shadow-color: 176deg 27% 46%;
  box-shadow: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.34),
    1px 2px 2.5px -2.5px hsl(var(--shadow-color) / 0.34);
`;

export const PopoverRoot = styled(Popover.Root)`
  grid-area: status;
`;

export const PopoverContent = styled(Popover.Content)`
  /* width: max-content; */
  border-radius: 6px;
  padding: 10px;
  padding-top: 15px;
  width: fit-content;
  background-color: white;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
`;
export const PositionedCloseButton = styled(CloseButton)`
  top: 3px;
  right: 3px;
  height: 12px;
  width: 12px;
`;

function ConfirmedPopoverButtons() {
  return (
    <ButtonWrapper>
      <CancelButton id="cancel-button">Cancel</CancelButton>
      <RescheduleButton id="reschedule-button">Reschedule</RescheduleButton>
    </ButtonWrapper>
  );
}
