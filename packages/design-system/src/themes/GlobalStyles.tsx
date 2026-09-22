import { Global, css } from "@emotion/react";
import { useTheme } from "@/hooks";
import font from "../../assets/fonts/pretendard-variable.woff2";

export const GlobalStyles = () => {
  const { currentTheme: theme } = useTheme();
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

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
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

        /* 폼 요소는 브라우저 기본 글꼴을 타므로 Pretendard를 물려받게 한다 */
        button,
        input,
        textarea,
        select {
          font-family: inherit;
        }

        main {
          margin: 0 auto;
        }
      `}
    />
  );
};
