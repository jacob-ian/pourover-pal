import { render, cleanup } from "@testing-library/react";
import IconButton from "./IconButton";

afterEach(() => {
  cleanup();
});

describe("IconButton", () => {
  const onClick = () => {};

  describe("Test without color or background color", () => {
    it("Should render component with close text in span", () => {
      const { getByText } = render(
        <IconButton onClick={onClick} iconName="close" />
      );
      const span = getByText("close");
      expect(span).toBeInTheDocument();
    });
  });

  describe("Test with color and background color", () => {
    it("Should have the color style", () => {
      const { getByRole } = render(
        <IconButton iconName="close" onClick={onClick} iconColor="#fff" />
      );
      const button = getByRole("button");
      const color = button?.style.color;
      expect(color).toBe("rgb(255, 255, 255)");
    });
    it("Should have the background color style", () => {
      const { getByRole } = render(
        <IconButton iconName="close" onClick={onClick} backgroundColor="#000" />
      );
      const button = getByRole("button");
      const backgroundColor = button?.style.backgroundColor;
      expect(backgroundColor).toBe("rgb(0, 0, 0)");
    });
  });
});
