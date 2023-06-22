import styled from "styled-components";

export const Button = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
`;

export const GreenButton = styled(Button)`
  background-color: var(--green4);
  color: var(--green11);
  width: fit-content;
  align-self: flex-end;

  &:hover {
    background-color: var(--green5);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--green7);
  }
`;

export const RedButton = styled(Button)`
  background-color: var(--red4);
  color: var(--red11);
  width: fit-content;
  align-self: flex-end;

  &:hover {
    background-color: var(--red5);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--red7);
  }
`;

export const VioletButton = styled(Button)`
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

export const IconButton = styled.button`
  all: unset;
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--violet11);
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background-color: var(--violet4);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--violet7);
  }
`;
