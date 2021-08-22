import { cleanup, render } from "@testing-library/react";
import { BrewDetails } from "../../App";
import BrewForm from "./BrewForm";

describe("BrewForm", () => {
  afterEach(() => cleanup());

  describe("Test rendering of each child component", () => {
    const details: BrewDetails = {
      waterVolume: 300,
      coffeeStrength: 60,
      bloomRatio: 2,
      bloomDuration: 45,
    };
    const dispatch = () => {};
    const component = <BrewForm {...details} dispatch={dispatch} />;

    const tests: { should: string; inputId: string }[] = [
      { should: "render the water volume input", inputId: "brew-volume" },
      {
        should: "render the absolute coffee strength input",
        inputId: "strength-abs",
      },
      { should: "render the bloom ratio input", inputId: "bloom-ratio" },
      { should: "render the bloom duration input", inputId: "bloom-duration" },
    ];

    tests.forEach((test) => {
      const { should, inputId } = test;
      it(`Should ${should}`, () => {
        const { getAllByRole } = render(component);
        const input = getAllByRole("spinbutton").filter(
          (input) => input.id === inputId
        )[0];
        expect(input).toBeInTheDocument();
      });
    });
  });
});
