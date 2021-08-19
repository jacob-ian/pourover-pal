import InputLabel from "../../common/InputLabel/InputLabel";
import BloomDuration from "./BloomDuration";
import BloomRatio from "./BloomRatio";

interface BloomProps {
  label: string;
  onBloomDurationChange: React.FormEventHandler<HTMLInputElement>;
  onBloomRatioChange: React.FormEventHandler<HTMLInputElement>;
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
          onChange={props.onBloomDurationChange}
        />
      </div>
      <div className="row">
        Water
        <BloomRatio
          value={props.bloomRatio}
          onChange={props.onBloomRatioChange}
        />
        Coffee
      </div>
    </>
  );
}
