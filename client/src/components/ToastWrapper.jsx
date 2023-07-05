import * as Toast from "@radix-ui/react-toast";
import styled, { keyframes } from "styled-components";
import { useToast } from "../hooks/useToast";
import { Status as ConfirmButton } from "../assets/AppointmentCapsuleStyles";
import { formatDetails } from "../helpers/formatDetails";
import { useContext } from "react";
import { UserContext } from "../context/user";

export function ToastWrapper() {
  const { user } = useContext(UserContext);
  const { toasts, removeToast } = useToast();

  const actionTitles = {
    create: "Appointment Requested",
    alter: "Appointment Request Changed",
    reschedule: "Reschedule Requested",
    delete: "Appointment Deleted",
    reject: "Appointment Rejected",
    confirm: "Appointment Confirmed",
    error: "Error",
  };

  function renderTitle(toast) {
    const { action, appointment } = toast;

    if (action === "notificationConfirm") {
      return `${appointment.therapist.name} confirmed your appointment request`;
    }
    if (action === "notificationReject") {
      return `${appointment.therapist.name} rejected your appointment request`;
    }
    if (action === "reschedule" && appointment.status === "pending") {
      return "Reschedule Request Updated";
    }
    if (action === "delete" && appointment.status === "pending") {
      return "Appointment Request Deleted";
    }
    return actionTitles[toast.action];
  }

  function renderDescription(toast) {
    const { appointment, newAppointment, action } = toast;

    if (action === "error") {
      return "There was an error and this action did not complete. Please try again";
    }

    const otherPartyName =
      user.user_type === "Client" ? appointment.therapist.name : appointment.client.name;
    const details = formatDetails(appointment);
    const newDetails = newAppointment ? formatDetails(newAppointment) : null;
    const fullDetails = `${details}, with ${otherPartyName}`;

    if (action === "create" || action === "confirm" || action === "reject") {
      return fullDetails;
    }
    if (action === "alter" || action === "reschedule") {
      return (
        <>
          <b>{otherPartyName}</b>
          <br />
          <b>From: </b>
          {details}
          <br />
          <b>To: </b>
          {newDetails}
        </>
      );
    }
    if (action === "notificationConfirm" || action === "notificationReject") {
      return details;
    }

    if (action === "delete") {
      return fullDetails;
    }
  }

  return (
    <>
      {toasts.map((toast) => (
        <Root key={toast.id} open={true} onOpenChange={() => removeToast(toast.id)}>
          <Title>{renderTitle(toast)}</Title>
          <Description>{renderDescription(toast)}</Description>
          <Confirmation asChild altText="confirm button">
            <ConfirmButton
              onClick={() => removeToast(toast.id)}
              status={toast.action === "reschedule" ? "reschedule" : toast.status}
            >
              OK
            </ConfirmButton>
          </Confirmation>
        </Root>
      ))}
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
  color: var(--blackA11);
  font-size: 13px;
  line-height: 1.3;
`;
const Details = styled.div`
  color: inherit;
  padding: 2px 0px;
`;

const NextStep = styled.div`
  padding: 2px 0px;
  color: var(--blackA12);
`;

const Confirmation = styled(Toast.Close)`
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
