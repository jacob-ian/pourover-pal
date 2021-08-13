import IconButton from "../../common/IconButton/IconButton";

interface ResetButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ResetButton(props: ResetButtonProps): JSX.Element {
  return (
    <IconButton
      onClick={props.onClick}
      iconName="restart_alt"
      iconColor="white"
      backgroundColor="#FF5050"
    />
  );
}
