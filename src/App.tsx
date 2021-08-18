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

export interface CoffeeGrindsInputs {
  waterVolume: number | undefined;
  coffeeStrengthAbsolute: number | undefined;
}

export default function App() {
  const [brewDetails, setBrewDetails] = useState<BrewDetails>({
    waterVolume: undefined,
    coffeeStrengthAbsolute: 60,
    coffeeStrengthRatio: calculateRatioStrength(60),
    coffeeGrinds: undefined,
    bloomDuration: 45,
    bloomRatio: 2,
  });
  const [brewStarted, setBrewStarted] = useState(false);
  const [brewPaused, setBrewPaused] = useState(false);

  function calculateRatioStrength(
    absolute: number | undefined
  ): number | undefined {
    if (!absolute) {
      return absolute;
    }
    const waterToCoffee = 1 / (absolute / 1000);
    return toOneDecimalPlace(waterToCoffee);
  }

  function toOneDecimalPlace(number: number): number {
    return Math.round((number + Number.EPSILON) * 10) / 10;
  }

  function calculateAbsoluteStrength(
    ratio: number | undefined
  ): number | undefined {
    if (!ratio) {
      return ratio;
    }
    const coffeeGramsPerLitre = (1 / ratio) * 1000;
    return toOneDecimalPlace(coffeeGramsPerLitre);
  }

  function updateBrewDetails(update: Partial<BrewDetails>): void {
    const { coffeeStrengthAbsolute, waterVolume } =
      getLatestGrindsInputs(update);
    const coffeeGrinds = calculateCoffeeGrinds(
      coffeeStrengthAbsolute,
      waterVolume
    );

    return setBrewDetails({ ...brewDetails, ...update, coffeeGrinds });
  }

  function getLatestGrindsInputs(
    update: Partial<BrewDetails>
  ): CoffeeGrindsInputs {
    let { coffeeStrengthAbsolute, waterVolume } = brewDetails;

    if (update.coffeeStrengthAbsolute) {
      coffeeStrengthAbsolute = update.coffeeStrengthAbsolute;
    }

    if (update.waterVolume) {
      waterVolume = update.waterVolume;
    }

    return { waterVolume, coffeeStrengthAbsolute };
  }

  function calculateCoffeeGrinds(
    coffeeStrengthAbsolute: number | undefined,
    waterVolume: number | undefined
  ): number | undefined {
    if (!coffeeStrengthAbsolute || !waterVolume) {
      return undefined;
    }
    const coffeeGrinds = coffeeStrengthAbsolute * (waterVolume / 1000);
    return toOneDecimalPlace(coffeeGrinds);
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
    setBrewDetails({
      waterVolume: undefined,
      coffeeStrengthAbsolute: 60,
      coffeeStrengthRatio: calculateRatioStrength(60),
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
