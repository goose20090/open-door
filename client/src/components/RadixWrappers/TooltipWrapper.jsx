import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import styled from "styled-components";
import { Time } from "../../assets/AppointmentCapsuleStyles";

export default function TooltipWrapper({ children, textContent, sideOffset = 0 }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <span>{children}</span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <TooltipContent sideOffset={sideOffset}>
          <TextContent>{textContent}</TextContent>
          <TooltipArrow />
        </TooltipContent>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

const TextContent = styled(Time)`
  color: var(--blackA12);
`;

const TooltipArrow = styled(Tooltip.Arrow)`
  fill: var(--blackA7);
`;

const TooltipContent = styled(Tooltip.Content)`
  border-radius: 4px;
  padding: 7px 12px;
  border: 1px solid var(--blackA7);
  background-color: white;
  --shadow-color: hsl(206 22% 7% / 35%);
  box-shadow: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.2),
    0.4px 0.9px 1.3px -0.7px hsl(var(--shadow-color) / 0.3),
    1px 2px 2.9px -1.4px hsl(var(--shadow-color) / 0.39);
  user-select: none;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-state="delayed-open"][data-side="top"] {
    animation-name: slideDownAndFade;
  }
  &[data-state="delayed-open"][data-side="right"] {
    animation-name: slideLeftAndFade;
  }
  &[data-state="delayed-open"][data-side="bottom"] {
    animation-name: slideUpAndFade;
  }
  &[data-state="delayed-open"][data-side="left"] {
    animation-name: slideRightAndFade;
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideRightAndFade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideDownAndFade {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideLeftAndFade {
    from {
      opacity: 0;
      transform: translateX(2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
