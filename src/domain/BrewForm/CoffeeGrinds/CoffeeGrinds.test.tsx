import { render, cleanup } from "@testing-library/react";
import CoffeeGrinds from "./CoffeeGrinds";

describe("CoffeeGrinds", () => {
  afterEach(() => cleanup());

  describe("Test coffee grinds calculation", () => {
    const tests: {
      should: string;
      waterVolume: number | undefined;
      coffeeStrength: number | undefined;
      expectedOutput: string;
    }[] = [
      {
        should: "Should show 18g of coffee grinds",
        waterVolume: 300,
        coffeeStrength: 60,
        expectedOutput: "Use 18g of coffee",
      },
      {
        should: "Should not show a message when inputs undefined",
        waterVolume: undefined,
        coffeeStrength: undefined,
        expectedOutput: "",
      },
      {
        should: "Should not show message when water volume undefined",
        waterVolume: undefined,
        coffeeStrength: 60,
        expectedOutput: "",
      },
      {
        should: "Should not show message when coffee strength undefined",
        waterVolume: 300,
        coffeeStrength: undefined,
        expectedOutput: "",
      },
      {
        should: "Should not show message when an input is negative",
        waterVolume: -300,
        coffeeStrength: 60,
        expectedOutput: "",
      },
    ];
    tests.forEach((test) => {
      const { should, waterVolume, coffeeStrength, expectedOutput } = test;
      const component = (
        <CoffeeGrinds
          waterVolume={waterVolume}
          coffeeStrength={coffeeStrength}
        />
      );
      it(should, () => {
        const { container } = render(component);
        const message = container.firstChild;
        expect(message?.textContent).toBe(expectedOutput);
      });
    });
  });
});
