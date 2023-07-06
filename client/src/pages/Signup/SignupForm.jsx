/** @format */

import React, { useState, useContext } from "react";
import * as Form from "@radix-ui/react-form";
import styled from "styled-components";
import { UserContext } from "../../context/user";
import { useSignUpMutation } from "../../hooks/useSignUpMutation";
import ErrorList from "../../components/Errors/ErrorList";
import { GreenButton } from "../../assets/Buttons";
import { StyledUpdateIcon } from "../../assets/NewAppointmentStyles";

export default function SignupForm() {
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  });

  const signupMutation = useSignUpMutation(formData);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <>
      <FormWrapper
        onSubmit={(e) => {
          e.preventDefault();
          signupMutation.mutate();
        }}
      >
        <h2>Signup</h2>
        {signupMutation.isLoading ? <LoadingIcon /> : null}
        <InputWrapper name="email">
          <InputLabel>Email</InputLabel>
          <Input
            type="email"
            name={"email"}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormMessage match={"valueMissing"} />
          <FormMessage match={"typeMismatch"}>Must be a valid email</FormMessage>
        </InputWrapper>
        <InputWrapper name="name">
          <InputLabel>Name</InputLabel>
          <Input name={"name"} required value={formData.name} onChange={handleChange} />
          <FormMessage match={"valueMissing"} />
        </InputWrapper>
        <InputWrapper name="password">
          <InputLabel>Password</InputLabel>
          <Input
            type="password"
            name={"password"}
            required
            value={formData.password}
            onChange={handleChange}
          />
          <FormMessage match={"valueMissing"} />
        </InputWrapper>
        <InputWrapper name="password_confirmation">
          <InputLabel>Confirm Password</InputLabel>
          <Input
            name={"password_confirmation"}
            value={formData.password_confirmation}
            onChange={handleChange}
            type="password"
            required
          />
          <FormMessage match={"valueMissing"} />
        </InputWrapper>
        {signupMutation.isError ? <SignupErrors errors={signupMutation.error} /> : null}
        <Form.Submit asChild>
          <SubmitButton>Submit</SubmitButton>
        </Form.Submit>
      </FormWrapper>
    </>
  );
}

const FormMessage = styled(Form.Message)`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: -30px;
  color: red;
  padding: 8px 0;
  font-style: italic;
  font-size: 13px;
`;

const LoadingIcon = styled(StyledUpdateIcon)`
  position: absolute;
  top: 15px;
  right: 15px;
`;
const SignupErrors = styled(ErrorList)`
  /* position: absolute;
  bottom: 45px; */
  margin-bottom: -40px;
`;

const FormWrapper = styled(Form.Root)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20%;
  height: 50%;
  width: 300px;
  background-color: hsla(0, 0%, 100%);
  box-shadow: 0 2px 10px var(--blackA4);
  border: 1px solid var(--blackA7);
  border-radius: 8px;
  padding: 8px;
`;

const InputWrapper = styled(Form.Field)`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const InputLabel = styled(Form.Label)`
  padding-right: 16px;
  color: rgb(104, 112, 118);
  font-size: 0.9rem;
  line-height: 1.3;
  align-self: center;
`;

const Input = styled(Form.Control)`
  height: 1.8rem;
  outline: none;
  font-size: 0.9rem;
  border: solid 1px var(--blackA9);
  border-radius: 4px;

  &:hover {
    /* background-color: var(--blackA2); */
    box-shadow: 0 0 0 1px var(--blackA5);
  }
  &:focus {
    box-shadow: 0 0 0 1px var(--blackA5);
    border-color: var(--blue8);
  }
`;

const SubmitButton = styled(GreenButton)`
  width: 90%;
  align-self: center;
`;
