import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import styled from "styled-components";
import "@radix-ui/colors/";
import BookingDialogContent from "./BookingDialogContent";
import { Button, BookingButton } from "../../assets/Buttons";

function BookingDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <BookingButton>Book an Appointment</BookingButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <BookingDialogContent setOpen={setOpen} />
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default BookingDialog;

const DialogOverlay = styled(Dialog.Overlay)`
  background-color: var(--blackA9);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DialogContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  /* max-width: 450px; */
  height: 50%;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  &:focus {
    outline: none;
  }
`;
