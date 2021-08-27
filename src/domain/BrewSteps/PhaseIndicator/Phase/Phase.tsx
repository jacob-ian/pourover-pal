import styles from "./Phase.module.sass";

export interface PhaseProps {
  name: string;
  durationSeconds: number;
  isCurrent: boolean;
}

export default function Phase(props: PhaseProps) {
  const currentStyle = props.isCurrent ? " " + styles.current : "";

  return (
    <div className={styles.phase}>
      <div className={styles.name + currentStyle}>{props.name}</div>
      <div className={styles.duration}>{props.durationSeconds}s</div>
    </div>
  );
}
