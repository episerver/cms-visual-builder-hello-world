import { PluginAPI } from "tailwindcss/types/config";

export default function ({ addBase, theme }: PluginAPI) {
  addBase({
    ".opti-row": {
      "--grid-column-count": "4",
      "--grid-item--min-width": "280px",

      "--gap-count": "calc(var(--grid-column-count) - 1)",
      "--total-gap-width": "calc(var(--gap-count) * var(--grid-layout-gap))",
      "--grid-item--max-width": "calc((100% - var(--total-gap-width)) / var(--grid-column-count))",

      "grid-template-columns": "repeat(auto-fit, minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr))",
      display: "grid",
      alignItems: "start", // This is the default value.
    },

    ".opti-col": {
      display: "flex",
      "flex-wrap": "wrap",
      position: "relative",
    },

    "@screen md": {
      ".opti-row.with-separators > .opti-col + .opti-col:before": {
        content: "''",
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "calc(var(--grid-layout-gap) * -0.5)",
        width: "1px",
        height: "90%",
        margin: "auto",
        opacity: ".5",
        background:
          "linear-gradient(1deg, rgba(255, 255, 255, 0) -2.88%, rgba(255, 255, 255, .6) 51.83%, rgba(255, 255, 255, .05) 99.11%, rgba(255, 255, 255, 0) 99.11%)",
      },
    },

    ".justify-stretch-children > *": {
      flexGrow: "1",
    },
  });

  const gapValues = theme("spacing") ?? {}; // Gets all spacing values from the theme

  // Iterate over each gap value and generate the utility class
  Object.keys(gapValues).forEach((key) => {
    const value = gapValues[key];

    addBase({
      [`.gap-${key}`]: {
        "--grid-layout-gap": value, // Add the CSS variable
      },
    });
  });
}
