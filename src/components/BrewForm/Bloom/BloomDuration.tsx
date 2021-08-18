import NumberInput from "../../common/NumberInput/NumberInput";

interface BloomDurationProps {
  onInput: React.FormEventHandler<HTMLInputElement>;
  value: number | undefined;
}

export default function BloomDuration(props: BloomDurationProps): JSX.Element {
  return (
    <NumberInput
      onInput={props.onInput}
      value={props.value}
      right="seconds"
      id="bloom-duration"
      maxLength={3}
      width={50}
    />
  );
}
