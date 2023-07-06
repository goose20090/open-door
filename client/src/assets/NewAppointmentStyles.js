import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { UpdateIcon } from "@radix-ui/react-icons";
import { VioletButton } from "./Buttons";
import { CheckIcon } from "@radix-ui/react-icons";

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
  position: absolute;
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
export const StyledCheckIcon = styled(CheckIcon)`
  height: 18px;
  width: 18px;
`;

export const RejectedConfirmButton = styled(VioletButton)`
  font-size: 12px;
  padding: 0 10px;
  line-height: 25px;
  border: 1px solid var(--violet8);
  height: 23px;
  align-self: center;
`;
export const Wrapper = styled.div`
  background-color: white;
  border-radius: 6px;
  border: 1px solid var(--blackA6);
  /* width: 400px; */
  min-width: ${({ status }) => (status === "reschedule" ? "370px" : "250px")};
  max-width: 400px;
  --shadow-color: 176deg 27% 46%;
  box-shadow: 0.5px 0.6px 0.9px hsl(var(--shadow-color) / 0.34),
    0.9px 1px 1.5px -1.2px hsl(var(--shadow-color) / 0.34),
    2.1px 2.4px 3.6px -2.5px hsl(var(--shadow-color) / 0.34);
  padding: 15px;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  /* display: grid;
  grid-template-areas: "title status" "description status";
  grid-template-columns: auto max-content; */
  column-gap: 15px;
  align-items: center;
  margin: 8px;
`;
