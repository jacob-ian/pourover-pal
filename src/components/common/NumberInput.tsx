import React from "react";
import "./NumberInput.sass";

interface NumberInputProps {
  onInput: React.FormEventHandler<HTMLInputElement>;
  value: number | undefined;
  label?: string;
  left?: string;
  right?: string;
}

export default function NumberInput(props: NumberInputProps): JSX.Element {
  return (
    <div className="number-input">
      {props.label}
      {props.left}
      <input type="number" value={props.value || ""} onInput={props.onInput} />
      {props.right}
    </div>
  );
}
