import IconButton from "../../common/IconButton/IconButton";

interface EndButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function EndButton(props: EndButtonProps): JSX.Element {
  return (
    <IconButton
      onClick={props.onClick}
      iconName="close"
      iconColor="white"
      backgroundColor="#FF5050"
    />
  );
}
