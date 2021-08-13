import InputLabel from "./InputLabel";
import "./NumberInput.sass";

interface NumberInputProps {
  onInput: React.FormEventHandler<HTMLInputElement>;
  value: number | undefined;
  label: string;
  units?: string;
}

export default function NumberInput(props: NumberInputProps): JSX.Element {
  const unitsClass = props.units ? " with-units" : "";

  return (
    <InputLabel label={props.label}>
      <div
        className={"number-input-container" + unitsClass}
        data-right={props.units}
      >
        <input
          className="number-input"
          type="number"
          value={props.value || ""}
          onInput={props.onInput}
        />
      </div>
    </InputLabel>
  );
}
