import { IconType } from "../icon.template";
export const ArrowRightIcon = ({ width = "19", height = "19"}: IconType) => {
  return (
    <svg
      className="icon-arrowRight"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width={width}
      height={height}
      viewBox="0 0 19 14"
      xmlSpace="preserve"
    >
      <path fill="currentColor" stroke="currentColor" strokeWidth="1.5" d="M17.9,6L17.9,6c-3.3,0-6,2.7-6,6 M17.9,6c-3.3,0-6-2.7-6-6v0" />
      <line fill="currentColor" stroke="currentColor" strokeWidth="1.5" x1="1.9" y1="6" x2="17.9" y2="6" />
    </svg>
  );
};
