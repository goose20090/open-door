import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "../../assets/styles.css";
import styled from "styled-components";
import "@radix-ui/colors/blackA.css";
import "@radix-ui/colors/green.css";
import "@radix-ui/colors/mauve.css";
import "@radix-ui/colors/violet.css";

const DialogDemo = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <VioletButton>Book an Appointment</VioletButton>
    </Dialog.Trigger>
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>Book a New Appointment</DialogTitle>
        <DialogDescription className="DialogDescription">
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
        <Fieldset className="Fieldset">
          <Label className="Label" htmlFor="name">
            Name
          </Label>
          <Input className="Input" id="name" defaultValue="Pedro Duarte" />
        </Fieldset>
        <Fieldset className="Fieldset">
          <Label className="Label" htmlFor="username">
            Username
          </Label>
          <Input className="Input" id="username" defaultValue="@peduarte" />
        </Fieldset>
        <div
          style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
        >
          <Dialog.Close asChild>
            <GreenButton>Save changes</GreenButton>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <IconButton className="IconButton" aria-label="Close">
            <Cross2Icon />
          </IconButton>
        </Dialog.Close>
      </DialogContent>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;

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
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
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

const DialogTitle = styled(Dialog.Title)`
  margin: 0;
  font-weight: 500;
  color: var(--mauve12);
  font-size: 17px;
`;

const DialogDescription = styled(Dialog.Description)`
  margin: 10px 0 20px;
  color: var(--mauve11);
  font-size: 15px;
  line-height: 1.5;
`;

const Button = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
`;

const VioletButton = styled(Button)`
  background-color: white;
  color: var(--violet11);
  box-shadow: 0 2px 10px var(--blackA7);

  &:hover {
    background-color: var(--mauve3);
  }
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;

const GreenButton = styled(Button)`
  background-color: var(--green4);
  color: var(--green11);

  &:hover {
    background-color: var(--green5);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--green7);
  }
`;

const IconButton = styled.button`
  all: unset;
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--violet11);
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background-color: var(--violet4);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--violet7);
  }
`;

const Fieldset = styled.fieldset`
  all: unset;
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 15px;
`;

const Input = styled.input`
  all: unset;
  width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  color: var(--violet11);
  box-shadow: 0 0 0 1px var(--violet7);
  height: 35px;

  &:focus {
    box-shadow: 0 0 0 2px var(--violet8);
  }
`;

const Label = styled.label`
  font-size: 15px;
  color: var(--violet11);
  width: 90px;
  text-align: right;
`;
