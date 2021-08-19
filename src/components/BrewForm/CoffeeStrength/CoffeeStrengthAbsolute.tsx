import NumberInput from "../../common/NumberInput/NumberInput";

interface CoffeeStrengthAbsProps {
  value: number | undefined;
  onChange: React.FormEventHandler<HTMLInputElement>;
}

export default function CoffeeStrengthAbsolute(
  props: CoffeeStrengthAbsProps
): JSX.Element {
  return (
    <NumberInput
      value={props.value}
      onChange={props.onChange}
      right="g/L"
      id="strength-abs"
      maxLength={4}
      width={50}
    />
  );
}
