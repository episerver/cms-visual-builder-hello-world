import { IconType } from "../icon.template";

export const QuoteIcon = ({ width, height }: IconType) => {
  return (
    <svg width="64" height="32" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Quote marks">
        <path
          id="Path"
          d="M64 11.4707V0C46.3358 0.0214367 32.0214 14.3358 32 32H43.4707C43.485 20.6679 52.6679 11.485 64 11.4707H64Z"
          fill="currentColor"
        />
        <path
          id="Path Copy"
          d="M32 11.4707V0C14.3358 0.0214367 0.0214367 14.3358 0 32H11.4707C11.485 20.6679 20.6679 11.485 32 11.4707H32Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
