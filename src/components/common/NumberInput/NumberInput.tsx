import React, { useRef } from "react";
import "./NumberInput.sass";

interface NumberInputProps {
  onChange: React.FormEventHandler<HTMLInputElement>;
  value: number | undefined;
  id: string;
  maxLength: number;
  width?: number;
  left?: string;
  right?: string;
}

export default function NumberInput(props: NumberInputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputValue = props.value !== undefined ? props.value : "";

  function shiftFocus() {
    inputRef.current?.focus();
  }

  return (
    <div className="number-input" onClick={shiftFocus}>
      {!!props.left && (
        <div className="number-input-label left" onClick={shiftFocus}>
          {props.left}
        </div>
      )}
      <input
        ref={inputRef}
        type="number"
        value={inputValue}
        onChange={props.onChange}
        id={props.id}
        style={{ width: props.width + "px" }}
      />
      {!!props.right && (
        <div className="number-input-label right" onClick={shiftFocus}>
          {props.right}
        </div>
      )}
    </div>
  );
}
