import IconButton from "@components/IconButton";
import "./ResetButton.sass";

interface ResetButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

export default function ResetButton(props: ResetButtonProps): JSX.Element {
  return (
    <IconButton
      className="reset-button"
      onClick={props.onClick}
      iconName="restart_alt"
      disabled={props.disabled}
    />
  );
}
