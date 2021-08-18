import NumberInput from "../../common/NumberInput/NumberInput";

interface CoffeeStrengthAbsProps {
  value: number | undefined;
  onInput: React.FormEventHandler<HTMLInputElement>;
}

export default function CoffeeStrengthAbsolute(
  props: CoffeeStrengthAbsProps
): JSX.Element {
  return (
    <NumberInput
      value={props.value}
      onInput={props.onInput}
      right="g/L"
      id="strength-abs"
      maxLength={4}
      width={50}
    />
  );
}
