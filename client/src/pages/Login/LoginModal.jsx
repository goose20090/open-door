import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export default function LoginModal() {
  return (
    <Root>
      <TriggerButtonWrapper>
        <button>Login</button>
      </TriggerButtonWrapper>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title />
          <Dialog.Description />
          <Dialog.Close />
        </Content>
      </Dialog.Portal>
    </Root>
  );
}

const Root = styled(Dialog.Root)``;

const TriggerButtonWrapper = styled(Dialog.Trigger)``;

const Overlay = styled(Dialog.Overlay)`
  background-color: var(--blackA9);
  position: fixed;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const Content = styled(Dialog.Content)`
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
`;
