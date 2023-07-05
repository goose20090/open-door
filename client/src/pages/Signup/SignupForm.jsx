/** @format */

import React, { useState, useContext } from "react";
import * as Form from "@radix-ui/react-form";
import styled from "styled-components";
import { UserContext } from "../../context/user";
import { useSignUpMutation } from "../../hooks/useSignUpMutation";
import ErrorList from "../../components/Errors/ErrorList";

export default function SignupForm() {
  const { setUser } = useContext(UserContext);
  let errors;

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  });

  const signupMutation = useSignUpMutation(formData);

  const { isError } = signupMutation;

  if (isError) {
    errors = signupMutation.error;
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <RadixForm
      onSubmit={(e) => {
        e.preventDefault();
        signupMutation.mutate();
      }}
    >
      <InputWrapper>
        <InputLabel>Email</InputLabel>
        <Input name={"email"} value={formData.email} onChange={handleChange} />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Name</InputLabel>
        <Input name={"name"} value={formData.name} onChange={handleChange} />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Password</InputLabel>
        <Input name={"password"} value={formData.password} onChange={handleChange} />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Password Confirmation</InputLabel>
        <Input
          name={"password_confirmation"}
          value={formData.password_confirmation}
          onChange={handleChange}
        />
      </InputWrapper>
      {isError ? <ErrorList errors={errors} /> : null}
      <SubmitButton>Submit</SubmitButton>
    </RadixForm>
  );
}

const RadixForm = styled(Form.Root)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

const InputWrapper = styled(Form.Field)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const InputLabel = styled(Form.Label)`
  padding-right: 16px;
`;

const Input = styled(Form.Control)``;

const SubmitButton = styled(Form.Submit)``;
