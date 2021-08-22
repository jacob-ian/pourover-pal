import { DetailsAction, BrewStateAction, BrewState } from "../../App";
import "./BrewControls.sass";
import BrewTimer from "./BrewTimer/BrewTimer";
import EndButton from "./EndButton/EndButton";
import ResetButton from "./ResetButton/ResetButton";

interface BrewControlsProps extends BrewState {
  dispatchBrew: React.Dispatch<BrewStateAction>;
  dispatchDetails: React.Dispatch<DetailsAction>;
}

export default function BrewControls(props: BrewControlsProps): JSX.Element {
  const { paused, ready, started, dispatchBrew, dispatchDetails } = props;

  function handleBrewTimerClick(): void {
    if (started) {
      return dispatchBrew({ type: paused ? "start" : "pause" });
    }
    return dispatchBrew({ type: "start" });
  }

  return (
    <div className="brew-controls">
      <ResetButton
        onClick={() => dispatchDetails({ type: "reset" })}
        disabled={started}
      />
      <BrewTimer
        onClick={handleBrewTimerClick}
        ready={ready}
        started={started}
        paused={paused}
      />
      <EndButton
        onClick={() => dispatchBrew({ type: "stop" })}
        disabled={!started}
      />
    </div>
  );
}
