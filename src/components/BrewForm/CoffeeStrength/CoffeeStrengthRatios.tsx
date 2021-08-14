import NumberInput from "../../common/NumberInput";

interface CoffeeStrengthRatiosProps {
  onInput: React.FormEventHandler<HTMLInputElement>;
  value: number | undefined;
}

export default function CoffeeStrengthRatios(
  props: CoffeeStrengthRatiosProps
): JSX.Element {
  return <NumberInput label="" value={props.value} onInput={props.onInput} />;
}
