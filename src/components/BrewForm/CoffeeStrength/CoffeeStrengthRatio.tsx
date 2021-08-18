import NumberInput from "../../common/NumberInput/NumberInput";

interface CoffeeStrengthRatioProps {
  onInput: React.FormEventHandler<HTMLInputElement>;
  value: number | undefined;
}

export default function CoffeeStrengthRatio(
  props: CoffeeStrengthRatioProps
): JSX.Element {
  return (
    <NumberInput
      value={props.value}
      onInput={props.onInput}
      left="1 : "
      id="strength-ratio"
      maxLength={3}
      width={50}
    />
  );
}
