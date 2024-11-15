import type { Config } from "tailwindcss";
import baseFontSizePlugin from "tailwindcss-base-font-size";
import containerPlugin from "./tailwind/plugins/container.plugin";
import gridPlugin from "./tailwind/plugins/grid.plugin";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.style.ts"],
  safelist: [
    // Custom CSS classes
    "opti-row",
    "opti-col",
    "justify-stretch-children",
    {
      pattern: /^text-.+/,
    },
    // Background color utilities
    {
      pattern: /^bg-.+/,
    },
    // Font utilities
    {
      pattern: /^font-.+/,
    },
    // Width and Height utilities
    {
      pattern: /^(w|h)-.+/,
    },
    // Margin utilities
    {
      pattern: /^(m|mx|my|mt|mr|mb|ml)-.+/,
    },
    // Padding utilities
    {
      pattern: /^(p|px|py|pt|pr|pb|pl)-.+/,
    },
    // Gap utilities
    {
      pattern: /^gap-.+/,
    },
    // Flex utilities (flex, flex-grow, flex-shrink, and flex-basis)
    {
      pattern: /^(flex|flex-).+/,
    },
    // Flex direction utilities
    {
      pattern: /^(justify|items)-.+/,
    },
    // Container utilities
    {
      pattern: /^(container|container-narrow|container-slim|container-full)$/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: '"Figtree", Arial, sans-serif',
        mono: "NBI Pro Mono, Arial, sans-serif",
        optiicons: "icomoon",
      },
      animation: {
        background: "background 7s ease infinite",
      },
      keyframes: {
        "pulse-scale": {
          "0%, 100%": { transform: "scale(1.2)", opacity: "0.75" },
          "50%": { transform: "scale(1)", opacity: "1" },
        },
        background: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      gridTemplateColumns: {
        "auto-2": "repeat(auto-fit, minmax(calc(50% - var(--grid-layout-gap)), 1fr))",
        "auto-4": "repeat(auto-fit, minmax(calc(25% - var(--grid-layout-gap)), 1fr))",
      },
      fontSize: {
        xs: "1.2rem",
        sm: "1.4rem",
        base: "1.6rem",
        lg: "1.8rem",
        xl: "2rem",
        "2xl": "2.4rem",
        "3xl": "3rem",
        "4xl": "3.6rem",
        "5xl": "4.8rem",
        "6xl": "6rem",
        "7xl": "7.2rem",
        "8xl": "9.6rem",
        "9xl": "12.8rem",
      },
      fontWeight: {
        regular: "320",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      borderRadius: {
        DEFAULT: "2.4rem",
        md: "1.2rem",
        lg: "3.6rem",
      },
      textShadow: {
        DEFAULT: "0px 0px 10px currentColor",
      },
      transitionDuration: {
        "800": "800ms",
      },
      boxShadow: {
        "card-hover":
          "0px 10px 10px 0px rgba(72, 79, 97, 0.30) inset, 0px 8px 10px 0px rgba(0, 0, 0, 0.20), 0px -1px 10px 0px rgba(72, 79, 97, 0.30) inset",
        "card-pressed": "4px 10px 10px 0px rgba(16, 20, 29, 0.50) inset, 0px -1px 10px 0px rgba(16, 20, 29, 0.30) inset",
      },
      backgroundImage: {
        "gradient-optimizely-blue":
          "radial-gradient(66.22% 59.25% at 50% 0%, rgba(0, 55, 255, 0.20) 0%, rgba(0, 11, 51, 0.00) 100%), linear-gradient(rgba(25, 30, 40, 0.90), rgba(25, 30, 40, 0.90))",
        "gradient-light-blue":
          "radial-gradient(66.22% 59.25% at 50% 0%, rgba(0, 204, 255, 0.20) 0%, rgba(51, 26, 3, 0.00) 100%), linear-gradient(rgba(25, 30, 40, 0.90), rgba(25, 30, 40, 0.90))",
        "gradient-purple":
          "radial-gradient(66.22% 59.25% at 50% 0%, rgba(134, 29, 255, 0.16) 0%, rgba(27, 6, 51, 0.00) 100%), linear-gradient(rgba(25, 30, 40, 0.90), rgba(25, 30, 40, 0.90))",
        "gradient-green":
          "radial-gradient(66.22% 59.25% at 50% 0%, rgba(59, 224, 129, 0.20) 0%, rgba(12, 45, 26, 0.00) 100%), linear-gradient(rgba(25, 30, 40, 0.90), rgba(25, 30, 40, 0.90))",
        "gradient-orange":
          "radial-gradient(66.22% 59.25% at 50% 0%, rgba(255, 129, 16, 0.20) 0%, rgba(12, 45, 26, 0.00) 100%), linear-gradient(rgba(25, 30, 40, 0.90), rgba(25, 30, 40, 0.90))",
        "gradient-border-optimizely-blue": "radial-gradient(36.22% 9.25% at 50% 0%, rgba(0, 55, 255) 0%, #434343)",
        "gradient-border-light-blue": "radial-gradient(36.22% 9.25% at 50% 0%, rgba(0, 204, 255) 0%, #434343)",
        "gradient-border-purple": "radial-gradient(36.22% 9.25% at 50% 0%, rgba(134, 29, 255) 0%, #434343)",
        "gradient-border-green": "radial-gradient(36.22% 9.25% at 50% 0%, rgba(59, 224, 129) 0%, #434343)",
        "gradient-border-orange": "radial-gradient(36.22% 9.25% at 50% 0%, rgba(255, 129, 16) 0%, #434343)",
        "gradient-hero-background":
          "linear-gradient(180deg, #10141d 55.03%, #191e28 100%), radial-gradient(17.88% 49.57% at 32.13% 100%, #10141d 34.26%, #303542 99.94%), radial-gradient(21.21% 58.79% at 50.01% 100%, #303542 0.25%, #10141d 97.49%), radial-gradient(10.56% 29.27% at 50.01% 100%, #404656 0.25%, #10141d 97.49%)",
        "gradient-highlight":
          "radial-gradient( 300px 100.04% at 50% 0%, rgba(0, 55, 255, 0.3) 0%, rgba(80, 17, 153, 0) 100% ), linear-gradient( 180deg, var(--vulcan) 0%, #0e1122 35.54%, var(--vulcan) 100% )",
      },
    },
    container: {
      center: true,
    },
    colors: {
      "optimizely-blue": {
        DEFAULT: "#0037ff",
        "20-tint": "#ccd7ff",
        "40-tint": "#99afff",
        "60-tint": "#6687ff",
        "80-tint": "#194bff",
        "80-shade": "#002ccc",
        "60-shade": "#002199",
        "40-shade": "#001666",
        "20-shade": "#000b33",
      },
      "dark-blue": {
        DEFAULT: "#080736",
        "20-tint": "#cecdd7",
        "40-tint": "#9c9caf",
        "60-tint": "#6b6a86",
        "80-tint": "#393a5d",
        "90-tint": "#212149",
        "90-shade": "#06062b",
        "60-shade": "#050420",
        "40-shade": "#030316",
        "20-shade": "#02010b",
      },
      "light-blue": {
        DEFAULT: "#00ccff",
        "20-tint": "#ccf5ff",
        "40-tint": "#99ebff",
        "60-tint": "#66e0ff",
        "80-tint": "#33d6ff",
        "80-shade": "#00a3cc",
        "60-shade": "#007a99",
        "40-shade": "#005266",
        "20-shade": "#002933",
      },
      orange: {
        DEFAULT: "#ff8110",
        "20-tint": "#ffe6cf",
        "40-tint": "#ffcd9f",
        "60-tint": "#ffb370",
        "80-tint": "#ff9a40",
        "80-shade": "#cc670d",
        "60-shade": "#994d0a",
        "40-shade": "#663406",
        "20-shade": "#331a03",
      },
      green: {
        DEFAULT: "#3be081",
        "20-tint": "#d9f9e6",
        "40-tint": "#b1f3cd",
        "60-tint": "#89ecb3",
        "80-tint": "#62e69a",
        "80-shade": "#2fb367",
        "60-shade": "#23864d",
        "40-shade": "#185a34",
        "20-shade": "#0c2d1a",
      },
      yellow: {
        DEFAULT: "#ffce00",
        "20-tint": "#fff5cc",
        "40-tint": "#ffeb99",
        "60-tint": "#ffe266",
        "80-tint": "#ffd833",
        "80-shade": "#cca500",
        "60-shade": "#997c00",
        "40-shade": "#665200",
        "20-shade": "#332900",
      },
      purple: {
        DEFAULT: "#861dff",
        "20-tint": "#e7d2ff",
        "40-tint": "#cfa5ff",
        "60-tint": "#b677ff",
        "80-tint": "#9e4aff",
        "80-shade": "#6b17cc",
        "60-shade": "#501199",
        "40-shade": "#360c66",
        "20-shade": "#1b0633",
      },
      gray: {
        "100": "#f8f8fc",
        "200": "#e9ebf1",
        "300": "#ced2dc",
        "400": "#969cac",
        "500": "#656c81",
        "600": "#484f61",
      },
      black: "#000",
      dust: "#F1ECE6",
      white: "#fff",
      vulcan: "#10141d",
      "vulcan-85": "#2c313f",
      "bright-gray": "#e9ebf1",
      "vulcan-95": "#191e28",
      "vulcan-90": "#232834",
      ebony: "#0e1122",
      red: "#f13030",
      independence: "#484f61",
      "pale-sky": "#656c81",
      "santas-gray": "#969cac",
      mischka: "#ced2dc",
      "ghost-white": "#f8f8fc",
      "theme-color": "var(--theme-color)",
      transparent: "transparent",
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1146px",
      xxl: "1400px",
    },
  },
  plugins: [
    gridPlugin,
    containerPlugin,
    baseFontSizePlugin({
      baseFontSize: 10,
    }),
  ],
};
export default config;
