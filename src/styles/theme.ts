import { ThemeConfig } from "antd";

const theme = {
  colors: {
    primary: "#F77A88",
    black: "#343434",
    blue: "#78C1F3",
    green: "#C4D7B2",
    gray: "rgb(107 114 128)",
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize: {
      small: "12px",
      medium: "16px",
      large: "20px",
    },
  },
};

export const antdThemeConfig: ThemeConfig = {
  token: {
    fontSize: +theme.typography.fontSize.medium.replace("px", ""),
    colorPrimary: theme.colors.primary,
  },
};

export default theme;
