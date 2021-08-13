interface BrewTimerProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  ready: boolean;
  started: boolean;
  paused: boolean;
}

export default function BrewTimer(props: BrewTimerProps): JSX.Element {
  const { paused, ready, started, onClick } = props;

  function getTimerContent() {
    if (started) {
      return paused ? "start" : "pause";
    }
    return "Brew";
  }

  return (
    <button className="brew-timer" disabled={!ready} onClick={onClick}>
      {getTimerContent()}
    </button>
  );
}
