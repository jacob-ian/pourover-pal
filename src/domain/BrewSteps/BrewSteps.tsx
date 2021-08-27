import { BrewDetails } from "../../App";
import styles from "./BrewSteps.module.sass";
import Instruction from "./Instruction/Instruction";
import Phase from "./PhaseIndicator/Phase/Phase";
import PhaseIndicator from "./PhaseIndicator/PhaseIndicator";

interface BrewStepsProps extends BrewDetails {
  paused: boolean;
}

export default function BrewSteps(props: BrewStepsProps): JSX.Element {
  return (
    <div className={styles["brew-steps"]}>
      <PhaseIndicator
        current={<Phase name="Bloom" durationSeconds={45} isCurrent={true} />}
        next={<Phase name="Pour" durationSeconds={90} isCurrent={false} />}
        previous={<Phase name="Grind" durationSeconds={30} isCurrent={false} />}
      />
      <Instruction instruction="eat your pizza " />
    </div>
  );
}
