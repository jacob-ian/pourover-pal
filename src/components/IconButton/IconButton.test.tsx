import { render, cleanup } from "@testing-library/react";
import IconButton from ".";

afterEach(() => {
  cleanup();
});

describe("IconButton", () => {
  const onClick = () => {};

  describe("Test without className", () => {
    it("Should render component with close text in span", () => {
      const { getByText } = render(
        <IconButton onClick={onClick} iconName="close" disabled={false} />
      );
      const span = getByText("close");
      expect(span).toBeInTheDocument();
    });
  });

  describe("Test with className", () => {
    it("Should have the class in classList", () => {
      const { getByRole } = render(
        <IconButton
          iconName="close"
          onClick={onClick}
          className="test"
          disabled={false}
        />
      );
      const button = getByRole("button");
      const classList = button.classList;
      expect(classList.contains("test")).toBeTruthy();
    });
  });
});
