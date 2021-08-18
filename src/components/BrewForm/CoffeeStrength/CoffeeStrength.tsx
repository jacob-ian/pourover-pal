import React, { useEffect, useState } from "react";
import {
  calculateAbsoluteStrength,
  calculateRatioStrength,
} from "../../../utils";
import InputLabel from "../../common/InputLabel/InputLabel";
import "./CoffeeStrength.sass";
import CoffeeStrengthAbsolute from "./CoffeeStrengthAbsolute";
import CoffeeStrengthRatio from "./CoffeeStrengthRatio";

interface CoffeeStrengthProps {
  label: string;
  onInput: (value: string) => void;
  value: number | undefined;
}

export default function CoffeeStrength(
  props: CoffeeStrengthProps
): JSX.Element {
  const { value } = props;
  const [ratio, setRatio] = useState<number | undefined>();

  useEffect(() => {
    setRatio(calculateRatioStrength(value));
  }, [value]);

  function handleRatioInput(e: React.FormEvent<HTMLInputElement>): void {
    const value = e.currentTarget.value as unknown as number;
    const absolute = calculateAbsoluteStrength(value ? value : undefined);
    return props.onInput(absolute ? `${absolute}` : "");
  }

  return (
    <>
      <InputLabel label={props.label} for="strength-abs" />
      <div className="coffee-strength">
        <CoffeeStrengthAbsolute
          value={props.value}
          onInput={(e) => props.onInput(e.currentTarget.value)}
        />
        =
        <CoffeeStrengthRatio value={ratio} onInput={handleRatioInput} />
      </div>
    </>
  );
}
