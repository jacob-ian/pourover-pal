import NumberInput from "@components/NumberInput";

interface BloomDurationProps {
  onChange: React.FormEventHandler<HTMLInputElement>;
  value: number | undefined;
}

export default function BloomDuration(props: BloomDurationProps): JSX.Element {
  return (
    <NumberInput
      onChange={props.onChange}
      value={props.value}
      right="seconds"
      id="bloom-duration"
      maxLength={3}
      width={50}
    />
  );
}
