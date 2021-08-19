import React, { useEffect, useState } from "react";
import {
  calculateAbsoluteStrength,
  calculateRatioStrength,
} from "../../../utils";
import NumberInput from "../../common/NumberInput/NumberInput";

interface CoffeeStrengthRatioProps {
  onChange: (value: string) => void;
  absoluteStrength: number | undefined;
}

export default function CoffeeStrengthRatio(
  props: CoffeeStrengthRatioProps
): JSX.Element {
  const [ratio, setRatio] = useState<number | undefined>();
  const { absoluteStrength, onChange } = props;

  useEffect(() => {
    setRatio(calculateRatioStrength(absoluteStrength));
  }, [absoluteStrength]);

  function handleRatioChange(e: React.FormEvent<HTMLInputElement>): void {
    const value = e.currentTarget.value as unknown as number;
    const newAbsoluteStrength = calculateAbsoluteStrength(
      value ? value : undefined
    );
    return onChange(newAbsoluteStrength ? `${newAbsoluteStrength}` : "");
  }

  return (
    <NumberInput
      value={ratio}
      onChange={handleRatioChange}
      left="1 : "
      id="strength-ratio"
      maxLength={3}
      width={50}
    />
  );
}
