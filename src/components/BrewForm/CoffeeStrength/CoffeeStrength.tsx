import InputLabel from "../../common/InputLabel/InputLabel";
import "./CoffeeStrength.sass";
import CoffeeStrengthAbsolute from "./CoffeeStrengthAbsolute";
import CoffeeStrengthRatio from "./CoffeeStrengthRatio";

interface CoffeeStrengthProps {
  label: string;
  onAbsoluteInput: React.FormEventHandler<HTMLInputElement>;
  onRatioInput: React.FormEventHandler<HTMLInputElement>;
  absolute: number | undefined;
  ratio: number | undefined;
}

export default function CoffeeStrength(
  props: CoffeeStrengthProps
): JSX.Element {
  return (
    <>
      <InputLabel label={props.label} for="strength-abs" />
      <div className="coffee-strength">
        <CoffeeStrengthAbsolute
          value={props.absolute}
          onInput={props.onAbsoluteInput}
        />
        =
        <CoffeeStrengthRatio value={props.ratio} onInput={props.onRatioInput} />
      </div>
    </>
  );
}
