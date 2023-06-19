import styled from "styled-components";
import { Button } from "../components/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { UpdateIcon } from "@radix-ui/react-icons";
export const HeaderWrapper = styled.header`
  grid-area: header;
`;

export const MainWrapper = styled.main``;

export const FormWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 4rem 1fr;
  grid-template-areas:
    "header time"
    "date time";
`;

export const DateSelectWrapper = styled.div`
  grid-area: date;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding-left: 16px;
`;

export const DatePickerWrapper = styled.div``;

export const BookingSubmitterWrapper = styled.div`
  grid-area: time;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const GreenButton = styled(Button)`
  background-color: var(--green4);
  color: var(--green11);
  width: fit-content;
  align-self: flex-end;

  &:hover {
    background-color: var(--green5);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--green7);
  }
`;

export const IconButton = styled.button`
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

export const Fieldset = styled.fieldset`
  all: unset;
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 15px;
`;

export const Input = styled.input`
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

export const Label = styled.label`
  font-size: 15px;
  color: var(--violet11);
  width: 90px;
  text-align: right;
`;

export const DialogTitle = styled(Dialog.Title)`
  margin: 0;
  font-weight: 500;
  color: var(--mauve12);
  font-size: 17px;
`;

export const DialogDescription = styled(Dialog.Description)`
  margin: 10px 0 20px;
  color: var(--mauve11);
  font-size: 15px;
  line-height: 1.5;
`;

export const StyledUpdateIcon = styled(UpdateIcon)`
  animation-name: spin;
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  position: fixed;
  top: 15px;
  right: 50px;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
