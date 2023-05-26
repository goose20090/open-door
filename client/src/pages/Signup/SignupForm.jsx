/** @format */

import React, { useState, useContext } from "react";
import * as Form from "@radix-ui/react-form";
import styled from "styled-components";
import { UserContext } from "../../context/user";

export default function SignupForm() {
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirmation: "",
  });

  function attemptSignup(formData) {
    return fetch("api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setUser(r.name);
      });
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
        <InputLabel>Email</InputLabel>
        <Input name={"email"} value={formData.email} onChange={handleChange} />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Name</InputLabel>
        <Input name={"name"} value={formData.name} onChange={handleChange} />
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
