import * as Toast from "@radix-ui/react-toast";
import styled, { keyframes } from "styled-components";
import { useToast } from "../hooks/useToast";
import { Status as ConfirmButton } from "../assets/AppointmentCapsuleStyles";

export function ToastWrapper() {
  const { toastInfo, hideToast } = useToast();

  return (
    <>
      <Root open={toastInfo.isOpen} onOpenChange={hideToast}>
        <Title>{toastInfo.title}</Title>
        <Description>{toastInfo.description}</Description>
        <Action asChild altText="confirm button">
          <ConfirmButton onClick={hideToast} status="confirmed">
            Ok
          </ConfirmButton>
        </Action>
      </Root>
      <Viewport />
    </>
  );
}

const Title = styled(Toast.Title)`
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  color: var(--blackA12);
  font-size: 15px;
`;

const Description = styled(Toast.Description)`
  grid-area: description;
  margin: 0;
  color: var(--slate-11);
  font-size: 13px;
  line-height: 1.3;
`;

const Action = styled(Toast.Action)`
  grid-area: action;
`;

const Root = styled(Toast.Root)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: "title action" "description action";
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;
  &[data-state="open"] {
    animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  &[data-state="closed"] {
    animation: hide 100ms ease-in forwards;
  }
  &[data-swipe="move"] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  }
  &[data-swipe="cancel"] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }
  &[data-swipe="end"] {
    animation: swipeOut 100ms ease-out;
  }

  @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(calc(100% + 25px));
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(var(--radix-toast-swipe-end-x));
    }
    to {
      transform: translateX(calc(100% + var(--viewport-padding)));
    }
  }
`;

const Viewport = styled(Toast.Viewport)`
  --viewport-padding: 25px;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`;
