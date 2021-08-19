import { render, cleanup, fireEvent } from "@testing-library/react";
import CoffeeStrengthRatio from "./CoffeeStrengthRatio";

describe("CoffeeStrengthRatio", () => {
  afterEach(() => cleanup());

  describe("Test showing ratio strength from absolute", () => {
    const tests: {
      should: string;
      absolute: number | undefined;
      expectedRatio: string;
    }[] = [
      {
        should:
          "Should show a ratio strength of 1:16.7 for absolute strength of 60g/L",
        absolute: 60,
        expectedRatio: "16.7",
      },
      {
        should: "Should have an empty ratio for undefined absolute strength",
        absolute: undefined,
        expectedRatio: "",
      },
      {
        should: "Should have an empty ratio for absolute of 0g/L",
        absolute: 0,
        expectedRatio: "",
      },
    ];

    const onChange = () => {};
    tests.forEach((test) => {
      const { should, absolute, expectedRatio } = test;
      it(should, () => {
        const component = (
          <CoffeeStrengthRatio
            absoluteStrength={absolute}
            onChange={onChange}
          />
        );
        const { getByRole } = render(component);
        const ratioInput = getByRole("spinbutton") as HTMLInputElement;
        expect(ratioInput.value).toBe(expectedRatio);
      });
    });
  });

  describe("Test calling onChange with calculated absolute strength on ratio change", () => {
    const tests: {
      should: string;
      inputtedRatio: string;
      expectedAbsolute: string;
    }[] = [
      {
        should: "Should call onChange with absolute of '50' for ratio of 1:20",
        inputtedRatio: "20",
        expectedAbsolute: "50",
      },
      {
        should: "Should call onChange with absolute of '' for ratio of ''",
        inputtedRatio: "",
        expectedAbsolute: "",
      },
      {
        should: "Should call onChange with absolute of '' for ratio of 0",
        inputtedRatio: "0",
        expectedAbsolute: "",
      },
      {
        should: "Should call onChange with absolute of '' for ratio of 1:-1",
        inputtedRatio: "-1",
        expectedAbsolute: "",
      },
    ];

    tests.forEach((test) => {
      const { should, inputtedRatio, expectedAbsolute } = test;

      it(should, () => {
        const onChange = jest.fn();
        const component = (
          <CoffeeStrengthRatio absoluteStrength={20} onChange={onChange} />
        );

        const { getByRole } = render(component);
        const ratioInput = getByRole("spinbutton") as HTMLInputElement;
        fireEvent.change(ratioInput, {
          target: { value: inputtedRatio },
        });
        expect(onChange).toHaveBeenLastCalledWith(expectedAbsolute);
      });
    });
  });
});
