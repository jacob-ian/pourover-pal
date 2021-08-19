import { BrewDetails } from "./App";

interface CoffeeGrindsInputs {
  waterVolume: number | undefined;
  coffeeStrength: number | undefined;
}

export function toOneDecimalPlace(number: number): number {
  return Math.round((number + Number.EPSILON) * 10) / 10;
}

export function calculateRatioStrength(
  absolute: number | undefined
): number | undefined {
  if (!absolute || absolute <= 0) {
    return undefined;
  }
  const waterToCoffee = 1 / (absolute / 1000);
  return toOneDecimalPlace(waterToCoffee);
}

export function calculateAbsoluteStrength(
  ratio: number | undefined
): number | undefined {
  if (!ratio || ratio <= 0) {
    return undefined;
  }
  const coffeeGramsPerLitre = (1 / ratio) * 1000;
  return toOneDecimalPlace(coffeeGramsPerLitre);
}

export function calculateCoffeeGrinds(
  inputs: CoffeeGrindsInputs
): number | undefined {
  const { coffeeStrength, waterVolume } = inputs;
  if (!coffeeStrength || !waterVolume) {
    return undefined;
  }

  if (coffeeStrength < 0 || waterVolume < 0) {
    return undefined;
  }
  const coffeeGrinds = coffeeStrength * (waterVolume / 1000);
  return toOneDecimalPlace(coffeeGrinds);
}

export function getLatestGrindsInputs(
  original: Partial<BrewDetails>,
  update: Partial<BrewDetails>
): CoffeeGrindsInputs {
  let { coffeeStrength, waterVolume } = original;

  if (update.coffeeStrength) {
    coffeeStrength = update.coffeeStrength;
  }

  if (update.waterVolume) {
    waterVolume = update.waterVolume;
  }

  return { waterVolume, coffeeStrength };
}
