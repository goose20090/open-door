/** @format */

import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import styled from "styled-components";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  function attemptSignup(formData) {
    return fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => console.log(r));
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
        attemptSignup(formData);
      }}
    >
      <InputWrapper>
        <InputLabel>Username</InputLabel>
        <Input
          name={"username"}
          value={formData.username}
          onChange={handleChange}
        />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Password</InputLabel>
        <Input
          name={"password"}
          value={formData.password}
          onChange={handleChange}
        />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Password Confirmation</InputLabel>
        <Input
          name={"passwordConfirmation"}
          value={formData.passwordConfirmation}
          onChange={handleChange}
        />
      </InputWrapper>
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

const InputWrapper = styled(Form.Field)``;

const InputLabel = styled(Form.Label)`
  padding-right: 16px;
`;

const Input = styled(Form.Control)``;

const SubmitButton = styled(Form.Submit)``;
