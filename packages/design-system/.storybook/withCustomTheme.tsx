import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { GlobalStyles } from "../src/themes";
import { StoryContext, StoryFn } from "@storybook/react-vite";
import { useTheme } from "../src/hooks/useTheme";
import { addons } from "storybook/preview-api";
import { FORCE_RE_RENDER } from "storybook/internal/core-events";

interface Props {
  Story: StoryFn;
  context: StoryContext;
}

const isDocsPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const viewMode = urlParams.get("viewMode");

  return viewMode === "docs";
};

const ThemeDecorator = ({ Story, context }: Props) => {
  const { themeMode, currentTheme, toggleTheme } = useTheme();

  const handleToggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    toggleTheme();
    context.globals.backgrounds.value = newTheme;
    addons.getChannel().emit(FORCE_RE_RENDER);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <StoryContainer>
        {!isDocsPage() && (
          <ThemeToggleButton onClick={handleToggleTheme} title="Toggle Theme">
            {themeMode === "light" ? "🌙" : "☀️"} {themeMode}
          </ThemeToggleButton>
        )}
        <Story />
      </StoryContainer>
    </ThemeProvider>
  );
};

const StoryContainer = styled.div`
  position: relative;
`;

const ThemeToggleButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const withCustomTheme = (Story: StoryFn, context: StoryContext) => {
  return <ThemeDecorator Story={Story} context={context} />;
};
