import NumberInput from "../common/NumberInput";

interface VolumeInputProps {
  value: number | undefined;
  onInput: React.FormEventHandler<HTMLInputElement>;
}

export default function VolumeInput(props: VolumeInputProps): JSX.Element {
  return (
    <NumberInput
      label="Brew volume:"
      right="mL"
      value={props.value}
      onInput={props.onInput}
    />
  );
}
