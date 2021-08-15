import IconButton from "../../common/IconButton/IconButton";

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
    />
  );
}
