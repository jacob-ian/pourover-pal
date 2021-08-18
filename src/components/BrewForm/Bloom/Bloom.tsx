import InputLabel from "../../common/InputLabel/InputLabel";
import BloomDuration from "./BloomDuration";
import BloomRatio from "./BloomRatio";

interface BloomProps {
  label: string;
  onBloomDurationInput: React.FormEventHandler<HTMLInputElement>;
  onBloomRatioInput: React.FormEventHandler<HTMLInputElement>;
  bloomDuration: number | undefined;
  bloomRatio: number | undefined;
}

export default function Bloom(props: BloomProps): JSX.Element {
  return (
    <>
      <InputLabel label={props.label} for="" />
      <div className="row">
        Duration
        <BloomDuration
          value={props.bloomDuration}
          onInput={props.onBloomDurationInput}
        />
      </div>
      <div className="row">
        Water
        <BloomRatio
          value={props.bloomRatio}
          onInput={props.onBloomRatioInput}
        />
        Coffee
      </div>
    </>
  );
}
