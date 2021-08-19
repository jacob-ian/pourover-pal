import { Dispatch, useEffect } from "react";
import { BrewDetails, BrewStateAction } from "../App";

export function useBrewReady(
  brewDetails: BrewDetails,
  dispatch: Dispatch<BrewStateAction>
): void {
  function canStartBrew(): boolean {
    const { waterVolume, coffeeStrength, bloomDuration, bloomRatio } =
      brewDetails;
    return !!waterVolume && !!coffeeStrength && !!bloomDuration && !!bloomRatio;
  }

  useEffect(() => {
    dispatch({ type: "ready", payload: { value: canStartBrew() } });
  }, [brewDetails]);
}
