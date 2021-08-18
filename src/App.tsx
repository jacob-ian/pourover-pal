import "./App.sass";
import React, { useReducer, useState } from "react";
import { calculateCoffeeGrinds } from "./utils";
import BrewControls from "./components/BrewControls/BrewControls";
import BrewForm from "./components/BrewForm/BrewForm";
import BrewSteps from "./components/BrewSteps/BrewSteps";
import Card from "./components/Card";
import EndButton from "./components/BrewControls/EndButton/EndButton";
import Header from "./components/Header/Header";
import ResetButton from "./components/BrewControls/ResetButton/ResetButton";
import BrewTimer from "./components/BrewControls/BrewTimer/BrewTimer";

export type DetailsAction =
  | {
      type: "update";
      payload: {
        name: string;
        value: string | undefined;
      };
    }
  | { type: "reset" };

export interface BrewDetails {
  waterVolume: number | undefined;
  coffeeStrengthAbsolute: number | undefined;
  coffeeGrinds: number | undefined;
  bloomDuration: number | undefined;
  bloomRatio: number | undefined;
}

const DEFAULT_STATE: BrewDetails = {
  waterVolume: undefined,
  coffeeStrengthAbsolute: 60,
  coffeeGrinds: undefined,
  bloomDuration: 45,
  bloomRatio: 2,
};

function reduceDetails(
  details: BrewDetails,
  action: DetailsAction
): BrewDetails {
  switch (action.type) {
    case "reset":
      return DEFAULT_STATE;

    case "update":
      const { name, value } = action.payload;
      let coffeeGrinds = details.coffeeGrinds;
      if (name === "waterVolume" || name === "coffeeStrengthAbsolute") {
        const { waterVolume, coffeeStrengthAbsolute } = details;
        coffeeGrinds = calculateCoffeeGrinds({
          waterVolume,
          coffeeStrengthAbsolute,
          [name]: value,
        });
      }
      return { ...details, [name]: value ? value : undefined, coffeeGrinds };

    default:
      return details;
  }
}

export default function App() {
  const [brewDetails, dispatchDetails] = useReducer(
    reduceDetails,
    DEFAULT_STATE
  );

  const [brewStarted, setBrewStarted] = useState(false);
  const [brewPaused, setBrewPaused] = useState(false);

  function handleBrewTimerClick(): void {
    if (brewStarted) {
      return toggleBrewPause();
    }

    if (canStartBrew()) {
      return startBrew();
    }
  }

  function toggleBrewPause(): void {
    return setBrewPaused(!brewPaused);
  }

  function canStartBrew(): boolean {
    const { waterVolume, coffeeGrinds, bloomDuration, bloomRatio } =
      brewDetails;
    return !!waterVolume && !!coffeeGrinds && !!bloomDuration && !!bloomRatio;
  }

  function startBrew(): void {
    return setBrewStarted(true);
  }

  function handleEndButton(): void {
    setBrewStarted(false);
    setBrewPaused(false);
  }

  function handleResetButton(): void {
    return dispatchDetails({ type: "reset" });
  }

  return (
    <div className="App">
      <Header />
      <Card>
        {brewStarted ? (
          <BrewSteps {...brewDetails} brewPaused={brewPaused} />
        ) : (
          <BrewForm {...brewDetails} dispatch={dispatchDetails} />
        )}
        <BrewControls>
          <ResetButton onClick={handleResetButton} disabled={brewStarted} />
          <BrewTimer
            onClick={handleBrewTimerClick}
            ready={canStartBrew()}
            started={brewStarted}
            paused={brewPaused}
          />
          <EndButton onClick={handleEndButton} disabled={!brewStarted} />
        </BrewControls>
      </Card>
    </div>
  );
}
