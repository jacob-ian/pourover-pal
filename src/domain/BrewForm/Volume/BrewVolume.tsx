import InputLabel from "@components/InputLabel";
import NumberInput from "@components/NumberInput";

interface BrewVolumeProps {
  label: string;
  value: number | undefined;
  onChange: React.FormEventHandler<HTMLInputElement>;
}

export default function BrewVolume(props: BrewVolumeProps): JSX.Element {
  const id = "brew-volume";

  return (
    <>
      <InputLabel for={id} label={props.label} />
      <NumberInput
        id={id}
        right="mL"
        value={props.value}
        onChange={props.onChange}
        width={60}
        maxLength={5}
      />
    </>
  );
}
