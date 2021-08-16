import NumberInput from "../../common/NumberInput";

interface CoffeeStrengthAbsProps {
  value: number | undefined;
  onInput: React.FormEventHandler<HTMLInputElement>;
}

export default function CoffeeStrengthAbsolute(
  props: CoffeeStrengthAbsProps
): JSX.Element {
  return (
    <NumberInput value={props.value} onInput={props.onInput} right="g/L" />
  );
}
