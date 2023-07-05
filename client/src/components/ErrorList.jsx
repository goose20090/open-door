import React from "react";
import styled from "styled-components";
function ErrorList({ errors }) {
  return (
    <Ul>
      {errors.map((error) => (
        <li>{error}</li>
      ))}
    </Ul>
  );
}
const Ul = styled.ul`
  color: red;
  padding: 8px 0;
  font-style: italic;
  list-style-type: none;

  &:first-of-type {
    padding-top: 0;
  }
`;

export default ErrorList;
