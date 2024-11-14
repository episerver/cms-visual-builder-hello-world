import { IconType } from "../icon.template";

export const ArrowDownIcon = ({ width, height }: IconType) => {
  return (
    <svg
      className="icon-arrowDown"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 15 18"
      width="15"
      height="18"
    >
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M7.9,16L7.9,16c0-3.3-2.7-6-6-6 M7.9,16c0-3.3,2.7-6,6-6h0" />
      <line fill="none" stroke="currentColor" strokeWidth="1.5" x1="7.9" y1="0" x2="7.9" y2="16" />
    </svg>
  );
};
