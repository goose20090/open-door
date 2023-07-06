/** @format */

import React, { useState, useContext } from "react";
import * as Form from "@radix-ui/react-form";
import styled from "styled-components";
import { useLoginMutation } from "../../hooks/useLoginMutation";
import fetchWithError from "../../helpers/fetchWithError";
import ErrorList from "../../components/Errors/ErrorList";
import { GreenButton } from "../../assets/Buttons";
import { Time } from "../../assets/AppointmentCapsuleStyles";
import { UpdateIcon } from "@radix-ui/react-icons";
import { StyledUpdateIcon } from "../../assets/NewAppointmentStyles";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const loginMutation = useLoginMutation(formData);
  const { isLoading, isError } = loginMutation;

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
          loginMutation.mutate(formData);
        }}
      >
        <h2>Login</h2>
        <InputWrapper name="email">
          <InputLabel>Email</InputLabel>
          <Input
            type="email"
            name={"email"}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormMessage match="valueMissing">Must be present</FormMessage>
          <FormMessage match={"typeMismatch"}>Must be a valid email</FormMessage>
        </InputWrapper>
        <InputWrapper name="password">
          <InputLabel>Password</InputLabel>
          <Input
            type="password"
            name={"password"}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FormMessage match="valueMissing">Must be present</FormMessage>
        </InputWrapper>
        {loginMutation.isError ? <LoginErrors errors={loginMutation.error} /> : null}
        {loginMutation.isLoading ? <LoadingIcon /> : null}
        <Form.Submit asChild>
          <SubmitButton>Submit</SubmitButton>
        </Form.Submit>
      </FormWrapper>
    </>
  );
}
const LoginErrors = styled(ErrorList)`
  margin-bottom: -50px;
`;

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

const FormWrapper = styled(Form.Root)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20%;
  height: 40%;
  width: 300px;
  background-color: hsla(0, 0%, 100%);
  box-shadow: 0 2px 10px var(--blackA4);
  border: 1px solid var(--blackA7);
  border-radius: 8px;
  padding: 8px;
  /* overflow: hidden; */
`;

const InputWrapper = styled(Form.Field)`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const InputLabel = styled(Form.Label)`
  padding-right: 16px;
  color: rgb(104, 112, 118);
  line-height: 1.3;
  font-size: 0.9rem;
  align-self: center;
`;

const Input = styled(Form.Control)`
  height: 1.8rem;
  outline: none;
  border: solid 1px var(--blackA9);
  border-radius: 4px;
  font-size: 0.9rem;

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
