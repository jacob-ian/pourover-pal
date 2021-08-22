import "./EndButton.sass";
import IconButton from "@components/IconButton";

interface EndButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

export default function EndButton(props: EndButtonProps): JSX.Element {
  return (
    <IconButton
      onClick={props.onClick}
      iconName="close"
      disabled={props.disabled}
      className="end-button"
    />
  );
}
