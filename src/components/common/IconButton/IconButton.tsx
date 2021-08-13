import "./IconButton.sass";

interface IconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  iconName: string;
  backgroundColor?: string;
  iconColor?: string;
}

export default function IconButton(props: IconButtonProps): JSX.Element {
  const backgroundColor = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const iconColor = props.iconColor ? { color: props.iconColor } : {};

  return (
    <button
      className="icon-button"
      type="button"
      style={{ ...backgroundColor, ...iconColor }}
      onClick={props.onClick}
    >
      <span className="material-icons-outlined">{props.iconName}</span>
    </button>
  );
}
