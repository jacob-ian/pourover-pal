import { DetailsAction, MainAction, MainState } from "../../App";
import "./BrewControls.sass";
import BrewTimer from "./BrewTimer/BrewTimer";
import EndButton from "./EndButton/EndButton";
import ResetButton from "./ResetButton/ResetButton";

interface BrewControlsProps extends MainState {
  dispatchMain: React.Dispatch<MainAction>;
  dispatchDetails: React.Dispatch<DetailsAction>;
}

export default function BrewControls(props: BrewControlsProps): JSX.Element {
  const { brewPaused, brewReady, brewStarted, dispatchMain, dispatchDetails } =
    props;

  function handleBrewTimerClick(): void {
    if (brewStarted) {
      return dispatchMain({ type: brewPaused ? "start" : "pause" });
    }
    return dispatchMain({ type: "start" });
  }

  return (
    <div className="brew-controls">
      <ResetButton
        onClick={() => dispatchDetails({ type: "reset" })}
        disabled={brewStarted}
      />
      <BrewTimer
        onClick={handleBrewTimerClick}
        ready={brewReady}
        started={brewStarted}
        paused={brewPaused}
      />
      <EndButton
        onClick={() => dispatchMain({ type: "stop" })}
        disabled={!brewStarted}
      />
    </div>
  );
}
