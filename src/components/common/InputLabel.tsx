import React from "react";
import "./InputLabel.sass";

interface InputLabelProps {
  label: string;
  children: React.ReactNode;
  left?: string;
  right?: string;
}

export default function InputLabel(props: InputLabelProps): JSX.Element {
  return (
    <label className="input-label">
      {props.label}
      {props.children}
    </label>
  );
}
