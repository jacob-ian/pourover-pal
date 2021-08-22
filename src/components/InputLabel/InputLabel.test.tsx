import InputLabel from ".";
import { render } from "@testing-library/react";

describe("InputLabel", () => {
  const label = "This is a test label";

  describe("Test rendering", () => {
    const component = <InputLabel label={label} for={"test-id"} />;
    it("Should render a label in the document", () => {
      const { getByText } = render(component);
      const labelElement = getByText(label);
      expect(labelElement).toBeInTheDocument();
    });

    it("Should have the for tag on the label", () => {
      const { getByText } = render(component);
      const labelElement = getByText(label) as HTMLLabelElement;
      expect(labelElement.htmlFor).toBe("test-id");
    });
  });
});
