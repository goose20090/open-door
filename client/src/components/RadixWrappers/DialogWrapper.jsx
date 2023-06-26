import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import React, { useState } from "react";
import { CloseButton } from "../../assets/Buttons";
import { Cross2Icon } from "@radix-ui/react-icons";
export default function DialogWrapper({ children, content: Content, contentProps }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <span>{children}</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <Content {...contentProps} />
          <Dialog.Close asChild>
            <CloseButton>
              <Cross2Icon />
            </CloseButton>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
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
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  overflow: auto;

  &:focus {
    outline: none;
  }
  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
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

// const Button

// .Button {
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 4px;
//   padding: 0 15px;
//   font-size: 15px;
//   line-height: 1;
//   font-weight: 500;
//   height: 35px;
// }
// .Button.violet {
//   background-color: white;
//   color: var(--violet11);
//   box-shadow: 0 2px 10px var(--blackA7);
// }
// .Button.violet:hover {
//   background-color: var(--mauve3);
// }
// .Button.violet:focus {
//   box-shadow: 0 0 0 2px black;
// }
// .Button.green {
//   background-color: var(--green4);
//   color: var(--green11);
// }
// .Button.green:hover {
//   background-color: var(--green5);
// }
// .Button.green:focus {
//   box-shadow: 0 0 0 2px var(--green7);
// }

// .IconButton {
//   font-family: inherit;
//   border-radius: 100%;
//   height: 25px;
//   width: 25px;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   color: var(--violet11);
//   position: absolute;
//   top: 10px;
//   right: 10px;
// }
// .IconButton:hover {
//   background-color: var(--violet4);
// }
// .IconButton:focus {
//   box-shadow: 0 0 0 2px var(--violet7);
// }

// .Fieldset {
//   display: flex;
//   gap: 20px;
//   align-items: center;
//   margin-bottom: 15px;
// }

// .Label {
//   font-size: 15px;
//   color: var(--violet11);
//   width: 90px;
//   text-align: right;
// }

// .Input {
//   width: 100%;
//   flex: 1;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 4px;
//   padding: 0 10px;
//   font-size: 15px;
//   line-height: 1;
//   color: var(--violet11);
//   box-shadow: 0 0 0 1px var(--violet7);
//   height: 35px;
// }
// .Input:focus {
//   box-shadow: 0 0 0 2px var(--violet8);
// }
