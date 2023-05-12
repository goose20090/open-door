/** @format */

import React from "react";
import * as Form from "@radix-ui/react-form";
import styled from "styled-components";

export default function LoginForm() {
  const formData = {
    test: "hello",
  };

  function fetchLoginAttempt(formData) {
    return (
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        // .then((r) => r.json())
        .then((r) => console.log(r))
    );
  }
  return (
    <RadixForm
      onSubmit={(e) => {
        e.preventDefault();
        fetchLoginAttempt(formData);
        // console.log(JSON.stringify(formData));
      }}
    >
      <InputWrapper>
        <InputLabel>Username</InputLabel>
        <Input />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Password</InputLabel>
        <Input />
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
