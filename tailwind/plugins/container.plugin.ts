import { PluginAPI } from "tailwindcss/types/config";

const getContainer = (theme: any, key: string, screen: string) => {
  return {
    [`.container-${key}`]: {
      maxWidth: theme(`screens.${screen}`),
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: theme("spacing.3"),
      paddingRight: theme("spacing.3"),
    },
  };
};

export default function ({ addBase, theme }: PluginAPI) {
  addBase({
    ...getContainer(theme, "spacious", "xl"),
    ...getContainer(theme, "compact", "lg"),
    ...getContainer(theme, "narrow", "md"),
    ...getContainer(theme, "slim", "sm"),
    ".container": {
      paddingLeft: theme("spacing.3"),
      paddingRight: theme("spacing.3"),
    },
    ".container-full": {
      width: "100%",
      maxWidth: "100%",
    },
  });
}
