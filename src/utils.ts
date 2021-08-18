export function calculateRatioStrength(
  absolute: number | undefined
): number | undefined {
  if (!absolute) {
    return absolute;
  }
  const waterToCoffee = 1 / (absolute / 1000);
  return toOneDecimalPlace(waterToCoffee);
}

export function toOneDecimalPlace(number: number): number {
  return Math.round((number + Number.EPSILON) * 10) / 10;
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
  coffeeStrengthAbsolute: number | undefined,
  waterVolume: number | undefined
): number | undefined {
  if (!coffeeStrengthAbsolute || !waterVolume) {
    return undefined;
  }
  const coffeeGrinds = coffeeStrengthAbsolute * (waterVolume / 1000);
  return toOneDecimalPlace(coffeeGrinds);
}
