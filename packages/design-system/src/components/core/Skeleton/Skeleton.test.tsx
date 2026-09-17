import { expect, describe, it } from "vitest";
import { Skeleton } from "./Skeleton";
import { renderWithTheme } from "@/utils/render";

describe("Skeleton", () => {
  it("renders correctly", () => {
    const { container } = renderWithTheme(<Skeleton />);
    const skeletonElement = container.firstChild;
    expect(skeletonElement).toBeInTheDocument();
  });

  it("applies width correctly", () => {
    const { container } = renderWithTheme(<Skeleton width="200px" />);
    const skeletonElement = container.firstChild as HTMLElement;
    expect(skeletonElement).toHaveStyle("width: 200px");
  });

  it("applies height correctly", () => {
    const { container } = renderWithTheme(<Skeleton height="100px" />);
    const skeletonElement = container.firstChild as HTMLElement;
    expect(skeletonElement).toHaveStyle("height: 100px");
  });

  it("applies border radius correctly", () => {
    const { container } = renderWithTheme(<Skeleton $radius="8px" />);
    const skeletonElement = container.firstChild as HTMLElement;
    expect(skeletonElement).toHaveStyle("border-radius: 8px");
  });

  it("applies multiple border radius values correctly", () => {
    const { container } = renderWithTheme(
      <Skeleton $radius={["8px", "16px"]} />
    );
    const skeletonElement = container.firstChild as HTMLElement;
    expect(skeletonElement).toHaveStyle("border-radius: 8px 16px");
  });

  it("applies background color from theme", () => {
    const { container } = renderWithTheme(<Skeleton />);
    const skeletonElement = container.firstChild as HTMLElement;
    // renderWithTheme은 darkTheme으로 렌더한다 (grayScale[40] = #333333)
    expect(skeletonElement).toHaveStyle("background-color: rgb(51, 51, 51)");
  });

  it("applies all props correctly", () => {
    const { container } = renderWithTheme(
      <Skeleton width="300px" height="150px" $radius="12px" />
    );
    const skeletonElement = container.firstChild as HTMLElement;
    expect(skeletonElement).toHaveStyle("width: 300px");
    expect(skeletonElement).toHaveStyle("height: 150px");
    expect(skeletonElement).toHaveStyle("border-radius: 12px");
  });

  it("has animation applied", () => {
    const { container } = renderWithTheme(<Skeleton />);
    const skeletonElement = container.firstChild as HTMLElement;
    const styles = window.getComputedStyle(skeletonElement);
    expect(styles.animation).toBeTruthy();
  });

  it("renders with percentage dimensions", () => {
    const { container } = renderWithTheme(
      <Skeleton width="100%" height="50%" />
    );
    const skeletonElement = container.firstChild as HTMLElement;
    expect(skeletonElement).toHaveStyle("width: 100%");
    expect(skeletonElement).toHaveStyle("height: 50%");
  });
});
