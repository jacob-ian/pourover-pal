import "./BrewControls.sass";

interface BrewControlsProps {
  children: React.ReactNode;
}

export default function BrewControls(props: BrewControlsProps): JSX.Element {
  return <div className="brew-controls">{props.children}</div>;
}
