import NumberInput from "@components/NumberInput";

interface BloomRatioProps {
  onChange: React.FormEventHandler<HTMLInputElement>;
  value: number | undefined;
}

export default function BloomRatio(props: BloomRatioProps): JSX.Element {
  return (
    <NumberInput
      right=" : 1"
      value={props.value}
      onChange={props.onChange}
      id="bloom-ratio"
      maxLength={1}
      width={20}
    />
  );
}
