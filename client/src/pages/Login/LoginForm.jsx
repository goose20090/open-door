/** @format */

import React, { useState, useContext } from "react";
import * as Form from "@radix-ui/react-form";
import styled from "styled-components";
import { UserContext } from "../../context/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithError from "../../helpers/fetchWithError";

export default function LoginForm() {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const queryClient = useQueryClient();

  function attemptLogin(formData) {
    return fetchWithError("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  }

  const loginMutation = useMutation(attemptLogin, {
    onSuccess: (r) => {
      setUser(r);
      queryClient.setQueryData(["user", "authorisation"], () => r);
    },
    onError: (r) => console.log(r),
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <>
      {loginMutation.isLoading ? <p>Loading...</p> : null}
      {loginMutation.isError ? <p>{loginMutation.error.message}</p> : null}
      <RadixForm
        onSubmit={(e) => {
          e.preventDefault();
          loginMutation.mutate(formData);
        }}
      >
        <InputWrapper>
          <InputLabel>Email</InputLabel>
          <Input
            name={"email"}
            value={formData.email}
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
        <SubmitButton>Submit</SubmitButton>
      </RadixForm>
    </>
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
