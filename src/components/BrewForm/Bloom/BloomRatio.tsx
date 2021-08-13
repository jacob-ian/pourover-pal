import Select from "../../common/Select";

interface BloomRatioProps {
  value: number | undefined;
  onChange: React.FormEventHandler<HTMLSelectElement>;
}

export default function BloomRatio(props: BloomRatioProps): JSX.Element {
  const value = props.value ? `${props.value}` : "";

  return (
    <Select value={value} onChange={props.onChange} label="Water : Coffee">
      <option value="2">2:1</option>
      <option value="3">3:1</option>
    </Select>
  );
}
