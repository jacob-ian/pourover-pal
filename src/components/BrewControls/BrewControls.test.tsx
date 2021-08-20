import { render, cleanup } from "@testing-library/react";
import { BrewState } from "../../App";
import BrewControls from "./BrewControls";

afterEach(() => {
  cleanup();
});

describe("BrewControls", () => {
  describe("Test rendering the child components", () => {
    const state: BrewState = {
      paused: false,
      started: false,
      ready: false,
    };

    const component = (
      <BrewControls
        {...state}
        dispatchBrew={() => {}}
        dispatchDetails={() => {}}
      />
    );
    const tests: { should: string; textContent: string }[] = [
      { should: "render the reset button", textContent: "restart_alt" },
      { should: "render the end button", textContent: "close" },
      { should: "render the brew timer", textContent: "Brew" },
    ];

    tests.forEach((test) => {
      const { should, textContent } = test;

      it(`Should ${should}`, () => {
        const { getAllByRole } = render(component);
        const button = getAllByRole("button").filter(
          (button) => button.textContent === textContent
        )[0];

        expect(button).toBeInTheDocument();
      });
    });
  });

  describe("Test the setting the disabled state on BrewTimer", () => {
    const state: BrewState = {
      paused: false,
      started: false,
      ready: false,
    };

    const tests: {
      should: string;
      ready: boolean;
      expectedDisabled: boolean;
    }[] = [
      {
        should: "have brew button disabled",
        ready: false,
        expectedDisabled: true,
      },
      {
        should: "have brew button enabled",
        ready: true,
        expectedDisabled: false,
      },
    ];

    tests.forEach((test) => {
      const { should, ready, expectedDisabled } = test;
      const disabledState = { ...state, ready };
      const component = (
        <BrewControls
          {...disabledState}
          dispatchBrew={() => {}}
          dispatchDetails={() => {}}
        />
      );

      it(`Should ${should}`, () => {
        const { getAllByRole } = render(component);
        const button = getAllByRole("button").filter(
          (button) => button.textContent === "Brew"
        )[0] as HTMLButtonElement;
        expect(button.disabled).toBe(expectedDisabled);
      });
    });
  });

  describe("Test hiding and showing Reset and End Buttons", () => {
    const tests: {
      should: string;
      buttonContent: "restart_alt" | "close";
      started: boolean;
      expectedDisabled: boolean;
    }[] = [
      {
        should: "enable reset button if brew not started",
        buttonContent: "restart_alt",
        started: false,
        expectedDisabled: false,
      },
      {
        should: "disable reset button if brew started",
        buttonContent: "restart_alt",
        started: true,
        expectedDisabled: true,
      },
      {
        should: "enable end button if brew started",
        buttonContent: "close",
        started: true,
        expectedDisabled: false,
      },
      {
        should: "disable end button if brew not started",
        buttonContent: "close",
        started: false,
        expectedDisabled: true,
      },
    ];

    const state: BrewState = {
      paused: false,
      started: false,
      ready: false,
    };

    tests.forEach((test) => {
      const { should, buttonContent, started, expectedDisabled } = test;
      const currentState = { ...state, started };
      const component = (
        <BrewControls
          {...currentState}
          dispatchBrew={() => {}}
          dispatchDetails={() => {}}
        />
      );

      it(`Should ${should}`, () => {
        const { getAllByRole } = render(component);
        const button = getAllByRole("button").filter(
          (button) => button.textContent === buttonContent
        )[0] as HTMLButtonElement;
        expect(button.disabled).toBe(expectedDisabled);
      });
    });
  });
});
