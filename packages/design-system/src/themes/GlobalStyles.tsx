import { Global, css, useTheme } from "@emotion/react";
import font from "../../assets/fonts/pretendard-variable.woff2";

export const GlobalStyles = () => {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Pretendard Variable";
          font-display: swap;
          src:
            local(""),
            url(${font}) format("woff2");
        }

        html,
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family:
            "Pretendard Variable",
            -apple-system,
            "Roboto",
            "Helvetica Neue",
            "Segoe UI",
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: ${theme.color.grayScale[10]};
        }
      `}
    />
  );
};
