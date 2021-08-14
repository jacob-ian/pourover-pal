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
import BloomDuration from "./components/BrewForm/Bloom/BloomDuration";
import Bloom from "./components/BrewForm/Bloom/Bloom";
import BloomRatio from "./components/BrewForm/Bloom/BloomRatio";
import CoffeeGrinds from "./components/BrewForm/CoffeeGrinds/CoffeeGrinds";
import CoffeeStrength from "./components/BrewForm/CoffeeStrength/CoffeeStrength";
import CoffeeStrengthAbsolute from "./components/BrewForm/CoffeeStrength/CoffeeStrengthAbsolute";
import CoffeeStrengthRatios from "./components/BrewForm/CoffeeStrength/CoffeeStrengthRatios";

type InputEvent = React.FormEvent<HTMLInputElement>;
type SelectEvent = React.FormEvent<HTMLSelectElement>;

export interface BrewDetails {
  waterVolume: number | undefined;
  coffeeStrengthRatio: number | undefined;
  coffeeStrengthAbsolute: number | undefined;
  coffeeGrinds: number | undefined;
  bloomDuration: number | undefined;
  bloomRatio: number | undefined;
}

export default function App() {
  const [brewDetails, setBrewDetails] = useState<BrewDetails>({
    waterVolume: undefined,
    coffeeStrengthAbsolute: 60,
    coffeeStrengthRatio: calculateRatioStrength(60),
    coffeeGrinds: undefined,
    bloomDuration: undefined,
    bloomRatio: undefined,
  });
  const [brewStarted, setBrewStarted] = useState(false);
  const [brewPaused, setBrewPaused] = useState(false);

  function calculateRatioStrength(absolute: number): number {
    const waterToCoffee = 1 / (absolute / 1000);
    return toTwoDecimalPlaces(waterToCoffee);
  }

  function toTwoDecimalPlaces(number: number): number {
    return Math.round((number + Number.EPSILON) * 100) / 100;
  }

  function calculateAbsoluteStrength(ratio: number): number {
    const coffeeGrams = (1 / ratio) * 1000;
    return toTwoDecimalPlaces(coffeeGrams);
  }

  function handleAbsoluteStrength(event: InputEvent): void {
    const absolute = event.currentTarget.valueAsNumber;
    const ratio = calculateRatioStrength(absolute);
    return setBrewDetails({
      ...brewDetails,
      coffeeStrengthAbsolute: absolute,
      coffeeStrengthRatio: ratio,
    });
  }

  function handleRatioStrength(event: InputEvent): void {
    const ratio = event.currentTarget.valueAsNumber;
    const absolute = calculateAbsoluteStrength(ratio);
    return setBrewDetails({
      ...brewDetails,
      coffeeStrengthAbsolute: absolute,
      coffeeStrengthRatio: ratio,
    });
  }

  function handleNumberInput(
    brewDetail: string,
    event: InputEvent | SelectEvent
  ): void {
    const value = event.currentTarget.value;
    if (value) {
      return updateBrewDetail(brewDetail, parseInt(value));
    }

    return updateBrewDetail(brewDetail, undefined);
  }

  function updateBrewDetail(
    detail: string,
    value: number | string | undefined
  ): void {
    return setBrewDetails({ ...brewDetails, [detail]: value });
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
            <VolumeInput
              value={brewDetails.waterVolume}
              onInput={(event) => handleNumberInput("waterVolume", event)}
            />
            <CoffeeStrength>
              <CoffeeStrengthAbsolute
                value={brewDetails.coffeeStrengthAbsolute}
                onInput={handleAbsoluteStrength}
              />
              <CoffeeStrengthRatios
                value={brewDetails.coffeeStrengthRatio}
                onInput={handleRatioStrength}
              />
            </CoffeeStrength>
            <Bloom>
              <BloomRatio
                value={brewDetails.bloomRatio}
                onChange={(event) => handleNumberInput("bloomRatio", event)}
              />
              <BloomDuration
                value={brewDetails.bloomDuration}
                onInput={(event) => handleNumberInput("bloomDuration", event)}
              />
            </Bloom>
            <CoffeeGrinds value={brewDetails.coffeeGrinds} />
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
