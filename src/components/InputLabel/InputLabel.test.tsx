import InputLabel from ".";
import { render } from "@testing-library/react";

describe("InputLabel", () => {
  const label = "This is a test label";

  const { container } = render(
    <InputLabel label={label}>
      <input type="text" />
    </InputLabel>
  );

  const component = container.firstChild;

  it("Should render the label", () => {
    expect(component?.nodeName).toBe("LABEL");
  });

  it("Should have text inside the label", () => {
    expect(component?.firstChild?.textContent).toBe(label);
  });

  it("Should have an input inside the label", () => {
    expect(component?.lastChild?.nodeName).toBe("INPUT");
  });
});
