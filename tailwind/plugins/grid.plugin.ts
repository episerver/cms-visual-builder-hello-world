import { PluginAPI } from "tailwindcss/types/config";

const columns = 12;

const columnWidth = (index: number) => {
  return (index / columns) * 100 + "%";
};

const columnClasses = Array.from({ length: columns }, (_, i) => i + 1).reduce((acc, i) => {
  acc[`.col-${i}`] = { width: columnWidth(i), flex: "0 0 auto" };
  return acc;
}, {} as Record<string, any>);

const baseGutterX = "var(--gutter-x, 2.4rem)";
const baseGutterY = "var(--gutter-y, 0)";

export default function ({ addComponents, theme }: PluginAPI) {
  addComponents({
    ":root": {
      "--gutter-x": "2.4rem",
      "--gutter-y": "0",
    },
    // Row Class
    ".row": {
      display: "flex",
      flexWrap: "wrap",
      marginTop: `calc(${baseGutterY} * -1)`,
      marginRight: `calc(${baseGutterX} / -2)`,
      marginLeft: `calc(${baseGutterX} / -2)`,
    },

    ".row > [class*='col']": {
      marginTop: baseGutterY,
      paddingRight: `calc(${baseGutterX} / 2)`,
      paddingLeft: `calc(${baseGutterX} / 2)`,
      maxWidth: "100%",
      width: "100%",
      flexShrink: "0",
    },

    ".col": {
      flex: "1 0 0%",
    },
    // Column Class with dynamic widths
    // Responsive Column Sizes
    ...columnClasses,

    ".container-fluid": {
      width: "100%",
      marginRight: "auto",
      marginLeft: "auto",
      overflow: "hidden",
    },

    ".container": {
      paddingRight: `calc(${baseGutterX} / 2)`,
      paddingLeft: `calc(${baseGutterX} / 2)`,
    },

    // Gap Classes
    ".g-0": {
      "--gutter-x": "0",
      "--gutter-y": "0",
    },

    ".gx-0": {
      "--gutter-x": "0",
    },

    ".gy-0": {
      "--gutter-y": "0",
    },

    ".g-1": {
      "--gutter-x": "2.4rem",
      "--gutter-y": "2.4rem",

      [`@media (min-width: ${theme("screens.xl")})`]: {
        "--gutter-x": "4.2rem",
        "--gutter-y": "4.2rem",
      },

      [`@media (min-width: ${theme("screens.xxl")})`]: {
        "--gutter-x": "6.4rem",
        "--gutter-y": "6.4rem",
      },
    },

    ".gx-1": {
      "--gutter-x": "2.4rem",

      [`@media (min-width: ${theme("screens.xl")})`]: {
        "--gutter-x": "4.2rem",
      },

      [`@media (min-width: ${theme("screens.xxl")})`]: {
        "--gutter-x": "6.4rem",
      },
    },

    ".gy-1": {
      "--gutter-y": "2.4rem",

      [`@media (min-width: ${theme("screens.xl")})`]: {
        "--gutter-y": "4.2rem",
      },

      [`@media (min-width: ${theme("screens.xxl")})`]: {
        "--gutter-y": "6.4rem",
      },
    },
  });
}
