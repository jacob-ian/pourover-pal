import InputLabel from "./InputLabel";
import "./Select.sass";

interface SelectProps {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
  value: string;
  label: string;
}

export default function Select(props: SelectProps): JSX.Element {
  return (
    <InputLabel label={props.label}>
      <select className="select" onChange={props.onChange} value={props.value}>
        <option value="">Select...</option>
        {props.children};
      </select>
    </InputLabel>
  );
}
