import "./App.sass";
import React, { useState } from "react";
import BrewControls from "./components/BrewControls/BrewControls";
import BrewForm from "./components/BrewForm/BrewForm";
import BrewSteps from "./components/BrewSteps/BrewSteps";
import Card from "./components/Card";
import EndButton from "./components/BrewControls/EndButton/EndButton";
import Header from "./components/Header/Header";
import ResetButton from "./components/BrewControls/ResetButton/ResetButton";
import BrewTimer from "./components/BrewControls/BrewTimer/BrewTimer";
import VolumeInput from "./components/BrewForm/VolumeInput";

type InputEvent = React.FormEvent<HTMLInputElement>;

export interface BrewDetails {
  waterVolume: number | undefined;
  coffeeGrinds: number | undefined;
  bloomDuration: number | undefined;
  bloomRatio: number | undefined;
}

export default function App() {
  const [brewDetails, setBrewDetails] = useState<BrewDetails>({
    waterVolume: undefined,
    coffeeGrinds: undefined,
    bloomDuration: undefined,
    bloomRatio: undefined,
  });
  const [brewStarted, setBrewStarted] = useState(false);
  const [brewPaused, setBrewPaused] = useState(false);

  function handleNumberInput(brewDetail: string, event: InputEvent): void {
    const value = event.currentTarget.valueAsNumber;
    if (value) {
      return setBrewDetails({ ...brewDetails, [brewDetail]: value });
    }

    return setBrewDetails({ ...brewDetails, [brewDetail]: undefined });
  }

  function handleBrewTimerClick(): void {
    if (brewStarted) {
      return setBrewPaused(!brewPaused);
    }

    if (canStartBrew()) {
      return setBrewStarted(true);
    }
  }

  function canStartBrew(): boolean {
    const { waterVolume, coffeeGrinds, bloomDuration, bloomRatio } =
      brewDetails;
    return !!waterVolume && !!coffeeGrinds && !!bloomDuration && !!bloomRatio;
  }

  function handleEndButton(): void {
    setBrewStarted(false);
    setBrewPaused(false);
  }

  function handleResetButton(): void {
    setBrewDetails({
      waterVolume: undefined,
      coffeeGrinds: undefined,
      bloomDuration: undefined,
      bloomRatio: undefined,
    });
  }

  return (
    <div className="App">
      <Header />
      <Card>
        {brewStarted ? (
          <BrewSteps />
        ) : (
          <BrewForm>
            <VolumeInput
              value={brewDetails.waterVolume}
              onInput={(event) => handleNumberInput("waterVolume", event)}
            />
          </BrewForm>
        )}
        <BrewControls>
          <BrewTimer
            onClick={handleBrewTimerClick}
            ready={canStartBrew()}
            started={brewStarted}
            paused={brewPaused}
          />
          {brewStarted ? (
            <EndButton onClick={handleEndButton} />
          ) : (
            <ResetButton onClick={handleResetButton} />
          )}
        </BrewControls>
      </Card>
    </div>
  );
}
