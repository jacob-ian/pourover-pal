import "./App.sass";
import React, { useState } from "react";
import {
  calculateAbsoluteStrength,
  calculateCoffeeGrinds,
  calculateRatioStrength,
  getLatestGrindsInputs,
} from "./utils";
import BrewControls from "./components/BrewControls/BrewControls";
import BrewForm from "./components/BrewForm/BrewForm";
import BrewSteps from "./components/BrewSteps/BrewSteps";
import Card from "./components/Card";
import EndButton from "./components/BrewControls/EndButton/EndButton";
import Header from "./components/Header/Header";
import ResetButton from "./components/BrewControls/ResetButton/ResetButton";
import BrewTimer from "./components/BrewControls/BrewTimer/BrewTimer";
import Bloom from "./components/BrewForm/Bloom/Bloom";
import CoffeeGrinds from "./components/BrewForm/CoffeeGrinds/CoffeeGrinds";
import CoffeeStrength from "./components/BrewForm/CoffeeStrength/CoffeeStrength";
import BrewVolume from "./components/BrewForm/Volume/BrewVolume";

type InputEvent = React.FormEvent<HTMLInputElement>;

export interface BrewDetails {
  waterVolume: number | undefined;
  coffeeStrengthRatio: number | undefined;
  coffeeStrengthAbsolute: number | undefined;
  coffeeGrinds: number | undefined;
  bloomDuration: number | undefined;
  bloomRatio: number | undefined;
}

export default function App() {
  const DEFAULT_STATE: BrewDetails = {
    waterVolume: undefined,
    coffeeStrengthAbsolute: 60,
    coffeeStrengthRatio: calculateRatioStrength(60),
    coffeeGrinds: undefined,
    bloomDuration: 45,
    bloomRatio: 2,
  };

  const [brewDetails, setBrewDetails] = useState<BrewDetails>(DEFAULT_STATE);
  const [brewStarted, setBrewStarted] = useState(false);
  const [brewPaused, setBrewPaused] = useState(false);

  function updateBrewDetails(update: Partial<BrewDetails>): void {
    const grindsInputs = getLatestGrindsInputs(brewDetails, update);
    const coffeeGrinds = calculateCoffeeGrinds(grindsInputs);

    return setBrewDetails({ ...brewDetails, ...update, coffeeGrinds });
  }

  function handleAbsoluteStrength(event: InputEvent): void {
    const value = event.currentTarget.value as unknown as number;
    const absolute = value ? value : undefined;
    const ratio = calculateRatioStrength(absolute);
    return updateBrewDetails({
      coffeeStrengthAbsolute: absolute,
      coffeeStrengthRatio: ratio,
    });
  }

  function handleRatioStrength(event: InputEvent): void {
    const value = event.currentTarget.value as unknown as number;
    const ratio = value ? value : undefined;
    const absolute = calculateAbsoluteStrength(ratio);
    return updateBrewDetails({
      coffeeStrengthAbsolute: absolute,
      coffeeStrengthRatio: ratio,
    });
  }

  function handleNumberInput(brewDetail: string, event: InputEvent): void {
    const value = event.currentTarget.value;
    return updateBrewDetails({
      [brewDetail]: value ? value : undefined,
    });
  }

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
    setBrewDetails(DEFAULT_STATE);
  }

  return (
    <div className="App">
      <Header />
      <Card>
        {brewStarted ? (
          <BrewSteps {...brewDetails} brewPaused={brewPaused} />
        ) : (
          <BrewForm>
            <BrewVolume
              label="Brew volume:"
              value={brewDetails.waterVolume}
              onInput={(event) => handleNumberInput("waterVolume", event)}
            />

            <CoffeeStrength
              label="Coffee strength:"
              absolute={brewDetails.coffeeStrengthAbsolute}
              onAbsoluteInput={handleAbsoluteStrength}
              ratio={brewDetails.coffeeStrengthRatio}
              onRatioInput={handleRatioStrength}
            />
            <Bloom
              label="Bloom:"
              bloomRatio={brewDetails.bloomRatio}
              onBloomRatioInput={(event) =>
                handleNumberInput("bloomRatio", event)
              }
              bloomDuration={brewDetails.bloomDuration}
              onBloomDurationInput={(event) =>
                handleNumberInput("bloomDuration", event)
              }
            />

            <CoffeeGrinds value={brewDetails.coffeeGrinds} />
          </BrewForm>
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
