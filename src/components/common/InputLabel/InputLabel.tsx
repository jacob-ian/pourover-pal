import "./InputLabel.sass";

interface InputLabelProps {
  label: string;
  for: string;
}

export default function InputLabel(props: InputLabelProps): JSX.Element {
  return (
    <label className="input-label" htmlFor={props.for}>
      {props.label}
    </label>
  );
}
