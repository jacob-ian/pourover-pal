import { BrewDetails } from "./App";

interface CoffeeGrindsInputs {
  waterVolume: number | undefined;
  coffeeStrengthAbsolute: number | undefined;
}

export function toOneDecimalPlace(number: number): number {
  return Math.round((number + Number.EPSILON) * 10) / 10;
}

export function calculateRatioStrength(
  absolute: number | undefined
): number | undefined {
  if (!absolute) {
    return absolute;
  }
  const waterToCoffee = 1 / (absolute / 1000);
  return toOneDecimalPlace(waterToCoffee);
}

export function calculateAbsoluteStrength(
  ratio: number | undefined
): number | undefined {
  if (!ratio) {
    return ratio;
  }
  const coffeeGramsPerLitre = (1 / ratio) * 1000;
  return toOneDecimalPlace(coffeeGramsPerLitre);
}

export function calculateCoffeeGrinds(
  inputs: CoffeeGrindsInputs
): number | undefined {
  const { coffeeStrengthAbsolute, waterVolume } = inputs;
  if (!coffeeStrengthAbsolute || !waterVolume) {
    return undefined;
  }
  const coffeeGrinds = coffeeStrengthAbsolute * (waterVolume / 1000);
  return toOneDecimalPlace(coffeeGrinds);
}

export function getLatestGrindsInputs(
  original: Partial<BrewDetails>,
  update: Partial<BrewDetails>
): CoffeeGrindsInputs {
  let { coffeeStrengthAbsolute, waterVolume } = original;

  if (update.coffeeStrengthAbsolute) {
    coffeeStrengthAbsolute = update.coffeeStrengthAbsolute;
  }

  if (update.waterVolume) {
    waterVolume = update.waterVolume;
  }

  return { waterVolume, coffeeStrengthAbsolute };
}
