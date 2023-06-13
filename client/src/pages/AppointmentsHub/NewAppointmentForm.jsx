import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { useQuery } from "@tanstack/react-query";
import fetchWithError from "../../helpers/fetchWithError";
import { useState } from "react";
import DatePickerComponent from "../../components/DatePickerComponent";
import { useTherapists } from "../../helpers/useTherapists";
import TherapistSelect from "../../components/TherapistSelect";
import TimeSelect from "./TimeSelect";
import {
  FormWrapper,
  HeaderWrapper,
  DateSelectWrapper,
  TimeSubmitWrapper,
  GreenButton,
  IconButton,
  DialogTitle,
  DialogDescription,
  DatePickerWrapper,
} from "../../assets/NewAppointmentStyles";

export default function NewAppointmentForm() {
  const testTimeOptArr = ["1", "2", "3", "4", "5"];

  const selectPlaceHolder = "please select a therapist";

  const [startDate, setStartDate] = useState(new Date());
  const [therapistSelected, setTherapistSelected] = useState(false);
  const { isLoading, data: therapists } = useTherapists();
  function handleChange(e) {
    setTherapistSelected(e.target.value !== selectPlaceHolder);
  }

  return (
    <FormWrapper>
      <HeaderWrapper>
        <DialogTitle>Book a New Appointment</DialogTitle>
        <DialogDescription className="DialogDescription">
          Select a therapist and pick an available time.
        </DialogDescription>
      </HeaderWrapper>
      <DateSelectWrapper>
        <TherapistSelect
          isLoading={isLoading}
          therapists={therapists}
          handleChange={handleChange}
          selectPlaceHolder={selectPlaceHolder}
        />
        <DatePickerWrapper>
          <DatePickerComponent
            therapistSelected={therapistSelected}
            startDate={startDate}
            setStartDate={setStartDate}
          />
        </DatePickerWrapper>
      </DateSelectWrapper>
      <TimeSubmitWrapper>
        <TimeSelect testTimeOptArr={testTimeOptArr} />
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
