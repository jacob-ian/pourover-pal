import { render, cleanup, fireEvent } from "@testing-library/react";
import CoffeeStrengthAbsolute from "./CoffeeStrengthAbsolute";

describe("CoffeeStrengthAbsolute", () => {
  afterEach(() => cleanup());

  describe("Test update of absolute on change of prop", () => {
    const tests: {
      should: string;
      value: number | undefined;
      expectedValue: string;
    }[] = [
      { should: "Should show value of 60 g/L", value: 60, expectedValue: "60" },
      {
        should: "Should show empty string for undefined strength",
        value: undefined,
        expectedValue: "",
      },
    ];

    const onChange = () => {};
    tests.forEach((test) => {
      const { should, value, expectedValue } = test;
      it(should, () => {
        const component = (
          <CoffeeStrengthAbsolute value={value} onChange={onChange} />
        );
        const { getByRole } = render(component);

        const input = getByRole("spinbutton") as HTMLInputElement;
        expect(input.value).toBe(expectedValue);
      });
    });
  });

  describe("Test calling of onChange when input typed in", () => {
    const tests: {
      should: string;
      inputtedValue: string;
    }[] = [
      { should: "Should call onChange with '50'", inputtedValue: "50" },
      {
        should: "Should call onChange with ''",
        inputtedValue: "",
      },
    ];

    tests.forEach((test) => {
      const { should, inputtedValue } = test;
      it(should, () => {
        const onChangeMock = jest.fn();
        const component = (
          <CoffeeStrengthAbsolute value={1} onChange={onChangeMock} />
        );
        const { getByRole } = render(component);
        const input = getByRole("spinbutton") as HTMLInputElement;

        fireEvent.change(input, { target: { value: inputtedValue } });
        expect(onChangeMock).toHaveBeenCalled();
      });
    });
  });
});
