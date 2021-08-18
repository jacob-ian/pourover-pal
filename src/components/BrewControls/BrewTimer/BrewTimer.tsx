import "./BrewTimer.sass";

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
      return (
        <span className="brew-play-pause material-icons">
          {paused ? "play_arrow" : "pause"}
        </span>
      );
    }
    return "Brew";
  }

  return (
    <button className="brew-timer" disabled={!ready} onClick={onClick}>
      {getTimerContent()}
    </button>
  );
}
