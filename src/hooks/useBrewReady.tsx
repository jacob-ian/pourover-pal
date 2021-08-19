import { Dispatch, useEffect } from "react";
import { BrewDetails, MainAction } from "../App";

export function useBrewReady(
  brewDetails: BrewDetails,
  dispatch: Dispatch<MainAction>
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
