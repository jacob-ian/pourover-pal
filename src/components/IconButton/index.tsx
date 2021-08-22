import "./IconButton.sass";

interface IconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  iconName: string;
  disabled: boolean;
  className?: string;
}

export default function IconButton(props: IconButtonProps): JSX.Element {
  return (
    <button
      className={"icon-button " + props.className}
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <span className="material-icons-outlined">{props.iconName}</span>
    </button>
  );
}
