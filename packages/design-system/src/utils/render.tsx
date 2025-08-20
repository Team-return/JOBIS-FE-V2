import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "../themes";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";

export const renderWithTheme = (element: ReactElement) => {
  return render(<ThemeProvider theme={darkTheme}>{element}</ThemeProvider>);
};
