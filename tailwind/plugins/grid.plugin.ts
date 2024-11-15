import { PluginAPI } from "tailwindcss/types/config";

export default function ({ addBase, theme }: PluginAPI) {
  addBase({
    ".opti-row": {
      display: "grid",
      alignItems: "start", // This is the default value.
      gridTemplateColumns: "1fr",
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
