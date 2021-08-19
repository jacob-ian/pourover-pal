import "./App.sass";
import { useReducer, useState } from "react";
import BrewControls from "./components/BrewControls/BrewControls";
import BrewForm from "./components/BrewForm/BrewForm";
import BrewSteps from "./components/BrewSteps/BrewSteps";
import Card from "./components/Card";
import EndButton from "./components/BrewControls/EndButton/EndButton";
import Header from "./components/Header/Header";
import ResetButton from "./components/BrewControls/ResetButton/ResetButton";
import BrewTimer from "./components/BrewControls/BrewTimer/BrewTimer";

interface DetailsUpdatePayload {
  name: BrewDetailKey;
  value: string | undefined;
}

export type DetailsAction =
  | {
      type: "update";
      payload: DetailsUpdatePayload;
    }
  | { type: "reset" };

export type BrewDetailKey =
  | "waterVolume"
  | "coffeeStrength"
  | "bloomDuration"
  | "bloomRatio";

export type BrewDetails = {
  [key in BrewDetailKey]: number | undefined;
};

const DEFAULT_STATE: BrewDetails = {
  waterVolume: undefined,
  coffeeStrength: 60,
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
      return { ...details, [name]: value ? value : undefined };

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
    const { waterVolume, coffeeStrength, bloomDuration, bloomRatio } =
      brewDetails;
    return !!waterVolume && !!coffeeStrength && !!bloomDuration && !!bloomRatio;
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
