import styles from "./PhaseIndicator.module.sass";
import Phase, { PhaseProps } from "./Phase/Phase";
import MaterialIcon from "@components/MaterialIcon";
import { ReactNode } from "react";

interface PhaseIndicatorProps {
  current: ReactNode;
  previous?: ReactNode;
  next?: ReactNode;
}

export default function PhaseIndicator(
  props: PhaseIndicatorProps
): JSX.Element {
  const { current, previous, next } = props;

  //TODO: Fix spacing of missing arrow in placeholder divs to center indicators

  return (
    <div className={styles["phase-indicator"]}>
      <div className={styles.phase}>
        {!!previous && (
          <>
            {previous}
            <MaterialIcon
              name="arrow_forward"
              className={styles["next-icon"]}
            />
          </>
        )}
      </div>
      <div className={styles.phase}>{current}</div>
      <div className={styles.phase}>
        {!!next && (
          <>
            <MaterialIcon
              name="arrow_forward"
              className={styles["next-icon"]}
            />
            {next}
          </>
        )}
      </div>
    </div>
  );
}
