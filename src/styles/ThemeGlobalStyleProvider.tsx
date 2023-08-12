import React from "react";
import theme, { antdThemeConfig } from "./theme";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ConfigProvider } from "antd";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  body {
    line-height: 1.5;
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.fontSize.medium};
  }
`;

export default function ThemeGlobalStyleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider theme={antdThemeConfig}>
        <GlobalStyle />
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
}
