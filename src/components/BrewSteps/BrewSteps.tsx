import { BrewDetails } from "../../App";
import "./BrewSteps.sass";

interface BrewStepsProps extends BrewDetails {
  paused: boolean;
}

export default function BrewSteps(props: BrewStepsProps): JSX.Element {
  return <div className="brew-steps"></div>;
}
