import styles from "./Instruction.module.sass";

interface InstructionProps {
  instruction: string;
}

export default function Instruction(props: InstructionProps): JSX.Element {
  return <div className={styles.instruction}>{props.instruction}</div>;
}
