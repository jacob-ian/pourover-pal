import { render, cleanup, fireEvent } from "@testing-library/react";

import CoffeeStrength from "./CoffeeStrength";

describe("CoffeeStrength", () => {
  const labelText = "Coffee strength:";

  afterEach(() => cleanup());

  describe("Test rendering of components", () => {
    const onChange = () => {};
    const component = (
      <CoffeeStrength label={labelText} onChange={onChange} value={60} />
    );

    it("Should render a label", () => {
      const { getByText } = render(component);
      const label = getByText(labelText);
      expect(label).toBeInTheDocument();
    });

    it("Should render the absolute strength input", () => {
      const { getAllByRole } = render(component);
      const absInput = getAllByRole("spinbutton").filter(
        (input) => input.id === "strength-abs"
      )[0] as HTMLInputElement;
      expect(absInput.value).toBe("60");
    });

    it("Should render the ratio strength input", () => {
      const { getAllByRole } = render(component);
      const ratioInput = getAllByRole("spinbutton").filter(
        (input) => input.id === "strength-ratio"
      )[0] as HTMLInputElement;
      expect(ratioInput.value).toBe("16.7");
    });
  });
});
