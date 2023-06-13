import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../components/Button";
import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../../helpers/fetchWithError";

export default function NewAppointmentForm() {
  const testTimeOptArr = ["1", "2", "3", "4", "5"];

  const therapistsQuery = useQuery(["therapists"], () =>
    fetchWithError("api/therapists")
  );

  const therapists = therapistsQuery.data;

  return (
    <FormWrapper>
      <HeaderWrapper>
        <DialogTitle>Book a New Appointment</DialogTitle>
        <DialogDescription className="DialogDescription">
          Select a therapist and pick an available time.
        </DialogDescription>
      </HeaderWrapper>
      <DateSelectWrapper>
        <select placeholder="thearapists" style={{ width: "fit-content" }}>
          <option>
            {therapistsQuery.isLoading
              ? "Loading..."
              : "please select a therapist"}
          </option>
          {therapistsQuery.isLoading
            ? null
            : therapists.map((therapist) => <option>{therapist.name}</option>)}
        </select>
        <DatePickerWrapper>
          <DatePicker inline />
        </DatePickerWrapper>
      </DateSelectWrapper>
      <TimeSubmitWrapper>
        <AppointmentTimes>
          <legend>Select a time for your appointment:</legend>
          {testTimeOptArr.map((opt) => (
            <div>
              <label for={opt}>{opt}</label>
              <input id={opt} name={`options`} type="radio" value={opt}></input>
            </div>
          ))}
        </AppointmentTimes>
        <Dialog.Close asChild>
          <GreenButton>Request Appointment</GreenButton>
        </Dialog.Close>
      </TimeSubmitWrapper>
      <Dialog.Close asChild>
        <IconButton className="IconButton" aria-label="Close">
          <Cross2Icon />
        </IconButton>
      </Dialog.Close>
    </FormWrapper>
  );
}

const HeaderWrapper = styled.header`
  grid-area: header;
`;

const MainWrapper = styled.main``;

const FormWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 4rem 1fr;
  grid-template-areas:
    "header time"
    "date time";
`;

const DateSelectWrapper = styled.div`
  grid-area: date;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding-left: 16px;
`;

const DatePickerWrapper = styled.div``;

const TimeSubmitWrapper = styled.div`
  grid-area: time;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const AppointmentTimes = styled.fieldset``;
const GreenButton = styled(Button)`
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

{
  /* <Fieldset>
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="Pedro Duarte" />
      </Fieldset>
      <Fieldset>
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@peduarte" />
      </Fieldset> */
}
