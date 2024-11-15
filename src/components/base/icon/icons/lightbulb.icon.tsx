import { IconType } from "../icon.template";
export const LightbulbIcon = ({ width = "24", height = "24" }: IconType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 24 24">
      <g clipPath="url(#clip0_408_3291)">
        <path
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeWidth="1.5"
          d="M18.33 5.15935L22.9249 1.07495M17.1749 12L23.4999 16.6M14.8749 17.1945C14.8749 11.8401 18.3279 11.6118 18.3279 7.49945C18.2961 6.35825 18.9014 1.07495 12.0006 1.07495C5.09976 1.07495 5.70576 6.35835 5.67386 7.49945C5.67386 11.6117 9.12686 11.84 9.12686 17.1945M0.499756 16.6L6.82476 12M1.07496 1.07495L5.67206 5.16125M14.875 17.75V20.0499C14.875 21.6377 13.5878 22.9249 12 22.9249H12.0014C10.4136 22.9249 9.12636 21.6377 9.12636 20.0499V17.75H14.875Z"        ></path>
      </g>
      <defs>
        <clipPath id="clip0_408_3291">
          <path fill="#fff" d="M0 0h24v24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};
