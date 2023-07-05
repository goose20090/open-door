import React from "react";
import styled from "styled-components";
import { Button } from "../../assets/Buttons";

export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <ErrorWrapper>
      <heading>
        <ErrorTitle>Something went wrong</ErrorTitle>
        <ErrorDescription>{error.message}</ErrorDescription>
      </heading>
      <Red onClick={resetErrorBoundary}>Try again</Red>
    </ErrorWrapper>
  );
}

const ErrorWrapper = styled.section`
  display: "flex";
  flexdirection: "column";
  justifycontent: "space-between";
  height: "100%";
  paddingbottom: "10%";
`;

const ErrorTitle = styled.h3`
  margin: 0;
  font-weight: 500;
  color: var(--mauve12);
  font-size: 17px;
`;

const ErrorDescription = styled.p`
  margin: 10px 0 20px;
  color: var(--mauve11);
  font-size: 15px;
  line-height: 1.5;
`;

const Red = styled(Button)`
  background-color: var(--violet4);
  color: var(--violet11);
  width: fit-content;
  align-self: flex-end;

  &:hover {
    background-color: var(--violet5);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--violet7);
  }
`;
