import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Grid } from "./Grid";
import { parseValue } from "@/utils";

describe("Grid", () => {
  it("renders with default props and children", () => {
    const testContent = "Test Content";
    render(<Grid>{testContent}</Grid>);
    const gridElement = screen.getByText(testContent);
    expect(gridElement).toBeInTheDocument();
    expect(gridElement).toHaveStyle("display: grid");
  });

  it("applies columns template correctly", () => {
    const columnsValue = "repeat(3, 1fr)";
    render(<Grid $columns={columnsValue}>Content</Grid>);
    const gridElement = screen.getByText("Content");
    expect(gridElement).toHaveStyle(`grid-template-columns: ${columnsValue}`);
  });

  it("applies rows template correctly", () => {
    const rowsValue = "100px 150px";
    render(<Grid $rows={rowsValue}>Content</Grid>);
    const gridElement = screen.getByText("Content");
    expect(gridElement).toHaveStyle(`grid-template-rows: ${rowsValue}`);
  });

  it("applies gap correctly", () => {
    const gapValue = 20;
    render(<Grid $gap={gapValue}>Content</Grid>);
    const gridElement = screen.getByText("Content");
    expect(gridElement).toHaveStyle(`gap: ${parseValue(gapValue)}`);
  });

  it("applies all props correctly", () => {
    const columnsValue = "repeat(2, 1fr)";
    const rowsValue = "100px 200px";
    const gapValue = 15;

    render(
      <Grid $columns={columnsValue} $rows={rowsValue} $gap={gapValue}>
        Content
      </Grid>
    );

    const gridElement = screen.getByText("Content");
    expect(gridElement).toHaveStyle(`grid-template-columns: ${columnsValue}`);
    expect(gridElement).toHaveStyle(`grid-template-rows: ${rowsValue}`);
    expect(gridElement).toHaveStyle(`gap: ${parseValue(gapValue)}`);
  });

  it("renders children correctly", () => {
    render(
      <Grid>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </Grid>
    );

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
  });
});
