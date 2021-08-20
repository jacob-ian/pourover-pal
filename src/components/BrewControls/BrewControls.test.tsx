import { render, cleanup, fireEvent } from "@testing-library/react";
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

  describe("Test handling BrewTimer clicks", () => {
    const tests: {
      should: string;
      started: boolean;
      paused: boolean;
      buttonText: string;
      expectedAction: string;
    }[] = [
      {
        should: "dispatch pause action on click when brew started",
        started: true,
        paused: false,
        buttonText: "pause",
        expectedAction: "pause",
      },
      {
        should: "dispatch start action on click when brew paused",
        started: true,
        paused: true,
        buttonText: "play_arrow",
        expectedAction: "start",
      },
      {
        should: "dispatch start action on click when brew not started",
        started: false,
        paused: false,
        buttonText: "Brew",
        expectedAction: "start",
      },
    ];

    tests.forEach((test) => {
      const { should, started, paused, buttonText, expectedAction } = test;
      it(`Should ${should}`, () => {
        const dispatchBrew = jest.fn();
        const state = { started, paused, ready: true };
        const component = (
          <BrewControls
            {...state}
            dispatchBrew={dispatchBrew}
            dispatchDetails={() => {}}
          />
        );

        const { getByText } = render(component);
        const button = getByText(buttonText) as HTMLButtonElement;
        fireEvent.click(button);
        expect(dispatchBrew).toHaveBeenCalledWith({ type: expectedAction });
      });
    });
  });

  describe("Test handling reset and end button clicks", () => {
    const tests: {
      should: string;
      started: boolean;
      buttonText: string;
      expectedAction: string;
    }[] = [
      {
        should: "dispatch reset action on reset button click and not started",
        started: false,
        buttonText: "restart_alt",
        expectedAction: "reset",
      },
      {
        should: "dispatch stop action on end button click and started",
        started: true,
        buttonText: "close",
        expectedAction: "stop",
      },
    ];

    tests.forEach((test) => {
      const { should, started, buttonText, expectedAction } = test;
      it(`Should ${should}`, () => {
        const state: BrewState = { started, ready: true, paused: false };
        const dispatchBrew = jest.fn();
        const dispatchDetails = jest.fn();
        const component = (
          <BrewControls
            {...state}
            dispatchBrew={dispatchBrew}
            dispatchDetails={dispatchDetails}
          />
        );

        const { getByText } = render(component);
        const button = getByText(buttonText) as HTMLButtonElement;
        fireEvent.click(button);
        expectedAction === "reset"
          ? expect(dispatchDetails).toHaveBeenCalledWith({
              type: expectedAction,
            })
          : expect(dispatchBrew).toHaveBeenCalledWith({ type: expectedAction });
      });
    });
  });
});
