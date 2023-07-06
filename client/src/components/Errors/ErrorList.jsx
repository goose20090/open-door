import React from "react";
import styled from "styled-components";
import { v4 as key } from "uuid";
function ErrorList({ errors, className }) {
  return (
    <Ul className={className}>
      {errors.map((error) => (
        <li key={key()}>{error}</li>
      ))}
    </Ul>
  );
}
const Ul = styled.ul`
  color: red;
  padding: 8px 0;
  font-style: italic;
  list-style-type: none;
  font-size: 13px;

  &:first-of-type {
    padding-top: 0;
  }
`;

export default ErrorList;
