import { render, createEvent, fireEvent } from "@testing-library/react";
import NumberInput from ".";

describe("NumberInput", () => {
  describe("Test rendering the input and labels", () => {
    const onChangeMock = () => {};
    const testValue = 10;
    const component = (
      <NumberInput
        onChange={onChangeMock}
        value={testValue}
        id="test-input"
        maxLength={5}
        left="1:"
        right="mL"
      />
    );

    it("Should render the number input with id", () => {
      const { getByRole } = render(component);
      const input = getByRole("spinbutton");
      expect(input.id).toBe("test-input");
    });

    it("Should render the left label", () => {
      const { getByText } = render(component);
      const left = getByText("1:");
      expect(left).toBeInTheDocument();
    });

    it("Should render the right label", () => {
      const { getByText } = render(component);
      const right = getByText("mL");
      expect(right).toBeInTheDocument();
    });
  });

  describe("Test onChange output", () => {
    it("Should call the onChange method on user type", () => {
      const onChangeMock = jest.fn();
      const testValue = 10;
      const component = (
        <NumberInput
          onChange={onChangeMock}
          value={testValue}
          id="test-input"
          maxLength={5}
          left="1:"
          right="mL"
        />
      );

      const { getByRole } = render(component);
      const input = getByRole("spinbutton");
      fireEvent.change(input, { target: { value: "100" } });
      expect(onChangeMock).toHaveBeenCalled();
    });
  });
});
