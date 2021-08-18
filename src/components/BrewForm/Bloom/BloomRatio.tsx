import NumberInput from "../../common/NumberInput/NumberInput";

interface BloomRatioProps {
  onInput: React.FormEventHandler<HTMLInputElement>;
  value: number | undefined;
}

export default function BloomRatio(props: BloomRatioProps): JSX.Element {
  return (
    <NumberInput
      right=" : 1"
      value={props.value}
      onInput={props.onInput}
      id="bloom-ratio"
      maxLength={1}
      width={20}
    />
  );
}
