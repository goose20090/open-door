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
  /* align-self: flex-end; */

  &:hover {
    background-color: var(--green5);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--green7);
  }

  &:disabled {
    background-color: var(--green1);
    color: var(--green7);
    border: 1px solid var(--blackA6);
    padding: 0 14px;
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

  &:hover {
    background-color: var(--violet5);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--violet7);
  }
`;

export const RoundIconButton = styled.button`
  all: unset;
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const CloseButton = styled(RoundIconButton)`
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

export const ConfirmButton = styled.button`
  all: unset;
  cursor: pointer;
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--grass7);
  color: white;

  &:hover {
    background-color: var(--grass9);
  }
  &:active {
    background-color: var(--grass9);
  }
`;

export const DenyButton = styled(ConfirmButton)`
  background-color: var(--red8);
  &:hover {
    background-color: var(--red9);
  }
  &:active {
    background-color: var(--red9);
  }
`;

export const BookingButton = styled(Button)`
  background-color: white;
  color: var(--violet11);
  box-shadow: 0 2px 10px var(--blackA7);

  &:hover {
    background-color: var(--mauve3);
  }
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;

export const BlueButton = styled(Button)`
  background-color: var(--blue4);
  color: var(--blue11);
  width: fit-content;
  align-self: flex-end;

  &:hover {
    background-color: var(--blue5);
  }

  &:focus {
    box-shadow: 0 0 0 2px var(--blue7);
  }
`;
